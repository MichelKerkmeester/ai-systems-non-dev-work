// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ CLI TESTS                                                                ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// Keep black-box CLI tests isolated from the fleet while exercising real command dispatch.
// The environment override mirrors the operator entry path without mutating repository files.

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const { ENV_OVERRIDE } = require('../lib/repo-root.cjs');
const { loadRegistry } = require('../lib/registry.cjs');
const { mkTempRepo, writeJson } = require('./helpers.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const CLI_PATH = path.join(__dirname, '..', 'ai-system-sync.cjs');
const SYSTEM_IDS = loadRegistry().systems.map((system) => system.id);

// ─────────────────────────────────────────────────────────────────────────────
// 3. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function runCli(argumentsList, options) {
  const runOptions = options || {};
  const result = spawnSync(process.execPath, [CLI_PATH, ...argumentsList], {
    encoding: 'utf8',
    env: { ...process.env, [ENV_OVERRIDE]: runOptions.repoRoot || mkTempRepo() },
  });
  return { status: result.status, stdout: result.stdout, stderr: result.stderr };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. TESTS
// ─────────────────────────────────────────────────────────────────────────────

test('--help exits 0 and lists every command', () => {
  const result = runCli(['--help']);
  assert.equal(result.status, 0);
  for (const commandName of [
    'plan',
    'check',
    'sync',
    'review-kernel',
    'upload-plan',
    'release-check',
  ]) {
    assert.ok(result.stdout.includes(commandName), `help text should mention "${commandName}"`);
  }
});

test('no arguments at all also prints help and exits 0', () => {
  const result = runCli([]);
  assert.equal(result.status, 0);
});

test('an unknown command exits 64 (usage), never one of the 0-6 state codes', () => {
  const result = runCli(['frobnicate']);
  assert.equal(result.status, 64);
  assert.match(result.stdout, /unknown command/);
});

test(
  'check --all against a repo root with none of the ten package folders exits 2, ' +
    'one message per system, no crash',
  () => {
    const repoRoot = mkTempRepo();
    const result = runCli(['check', '--all'], { repoRoot });
    assert.equal(result.status, 2);
    assert.equal(result.stderr, '', 'no stack trace on stderr');
    for (const systemId of SYSTEM_IDS) {
      assert.ok(result.stdout.includes(systemId), `expected a report line for ${systemId}`);
    }
  }
);

test('check with neither --system, --all, nor --staged exits 64', () => {
  const result = runCli(['check']);
  assert.equal(result.status, 64);
});

test('check --system <unknown-id> exits 2 with a clear message, not a crash', () => {
  const result = runCli(['check', '--system', 'not-a-real-system']);
  assert.equal(result.status, 2);
  assert.match(result.stdout, /unknown system id/);
});

test('sync without --write refuses and exits 2', () => {
  const result = runCli(['sync', '--system', 'product-owner']);
  assert.equal(result.status, 2);
  assert.match(result.stdout, /only writes with --write/);
});

test('sync --write against a system with no manifest yet still exits 2, cleanly', () => {
  const repoRoot = mkTempRepo();
  fs.mkdirSync(path.join(repoRoot, 'Product Owner'), { recursive: true });
  const result = runCli(['sync', '--system', 'product-owner', '--write'], { repoRoot });
  assert.equal(result.status, 2);
  assert.equal(result.stderr, '');
});

test('review-kernel without --reviewer/--reason exits 64', () => {
  const result = runCli(['review-kernel', '--system', 'product-owner']);
  assert.equal(result.status, 64);
});

test('release-check without --all exits 64', () => {
  const result = runCli(['release-check']);
  assert.equal(result.status, 64);
});

test('sync --system <id> --recover reports no interrupted transaction when none exists', () => {
  const repoRoot = mkTempRepo();
  fs.mkdirSync(path.join(repoRoot, 'Product Owner'), { recursive: true });
  const result = runCli(['sync', '--system', 'product-owner', '--recover'], { repoRoot });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /no interrupted transaction/);
});

test(
  'sync --system <id> --recover detects and rolls back a real interrupted journal end-to-end',
  () => {
    const repoRoot = mkTempRepo();
    const packageRoot = path.join(repoRoot, 'Product Owner');
    fs.mkdirSync(packageRoot, { recursive: true });
    fs.writeFileSync(path.join(packageRoot, 'file.md'), 'original\n');
    fs.renameSync(
      path.join(packageRoot, 'file.md'),
      path.join(packageRoot, 'file.md.ai-system-sync.bak')
    );
    fs.writeFileSync(path.join(packageRoot, 'file.md'), 'half-applied\n');
    writeJson(repoRoot, 'Product Owner/claude project/sync-journal.json', {
      schemaVersion: 1,
      operations: [{
        type: 'write',
        target: 'file.md',
        staged: null,
        backup: 'file.md.ai-system-sync.bak',
        existedBefore: true,
        done: true,
      }],
    });

    // Confirm the journal is visible before invoking the recovery command.
    const checkResult = runCli(['check', '--system', 'product-owner'], { repoRoot });
    assert.equal(checkResult.status, 5);
    assert.match(checkResult.stdout, /INTERRUPTED_TRANSACTION/);

    const recoverResult = runCli(['sync', '--system', 'product-owner', '--recover'], { repoRoot });
    assert.equal(recoverResult.status, 0);
    assert.match(recoverResult.stdout, /rolled back/);
    assert.equal(fs.readFileSync(path.join(packageRoot, 'file.md'), 'utf8'), 'original\n');
    assert.equal(
      fs.existsSync(path.join(packageRoot, 'claude project/sync-journal.json')),
      false
    );
  }
);

test(
  'upload-plan --all against an empty repo root reports "no manifest yet" per system, exit 0',
  () => {
    const result = runCli(['upload-plan', '--all']);
    assert.equal(result.status, 0);
    for (const systemId of SYSTEM_IDS) {
      assert.ok(result.stdout.includes(systemId));
    }
  }
);

test(
  'plan --all reports "nothing to plan yet" per system (exit 0) once the package folders exist ' +
    'but have no manifest',
  () => {
    const repoRoot = mkTempRepo();
    // Match the registry's exact package roots so the plan path sees complete system coverage.
    for (const systemEntry of loadRegistry().systems) {
      fs.mkdirSync(path.join(repoRoot, systemEntry.packageRoot), { recursive: true });
    }
    const result = runCli(['plan', '--all'], { repoRoot });
    assert.equal(result.status, 0, result.stdout);
  }
);

test('plan --all against a repo root missing the package folders themselves exits 2', () => {
  const result = runCli(['plan', '--all']);
  assert.equal(result.status, 2);
});

test(
  'release-check --all against an empty repo root exits 2 (missing manifests), ' +
    'one message per system',
  () => {
    const result = runCli(['release-check', '--all']);
    assert.equal(result.status, 2);
    for (const systemId of SYSTEM_IDS) {
      assert.ok(result.stdout.includes(systemId));
    }
  }
);

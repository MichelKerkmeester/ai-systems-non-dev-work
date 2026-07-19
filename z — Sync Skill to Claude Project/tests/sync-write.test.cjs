// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ SYNC WRITE TESTS                                                         ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// Exercise the real sync --write path against isolated fixtures.
// Verify live-byte rendering, transactions, lock creation and idempotence.
// Keep fixtures isolated so the command cannot mutate the fleet.

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const { ENV_OVERRIDE } = require('../lib/repo-root.cjs');
const { hashFile } = require('../lib/hashing.cjs');
const { mkTempRepo, writeFile, writeJson } = require('./helpers.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const CLI_PATH = path.join(__dirname, '..', 'ai-system-sync.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 3. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function runCli(argumentsList, repoRoot) {
  const result = spawnSync(process.execPath, [CLI_PATH, ...argumentsList], {
    encoding: 'utf8',
    env: { ...process.env, [ENV_OVERRIDE]: repoRoot },
  });
  return { status: result.status, stdout: result.stdout, stderr: result.stderr };
}

function buildFixture() {
  const repoRoot = mkTempRepo();
  const skillContent = '# Fixture Skill\n\nBody text.\n';
  writeFile(repoRoot, 'Product Owner/sk-product-owner/SKILL.md', skillContent);
  writeFile(repoRoot, 'Product Owner/claude project/Custom Instructions.md', '# Fixture Kernel\n');
  writeFile(
    repoRoot,
    'Product Owner/SYNC.md',
    '# Sync\n\n<!-- BEGIN GENERATED: AI-SYSTEM-SYNC INVENTORY -->\n' +
      '(pending sync --write)\n' +
      '<!-- END GENERATED: AI-SYSTEM-SYNC INVENTORY -->\n'
  );
  writeFile(
    repoRoot,
    'Product Owner/claude project/README.md',
    '# Project\n\n<!-- BEGIN GENERATED: AI-SYSTEM-SYNC CHECKSUMS -->\n' +
      '(pending sync --write)\n' +
      '<!-- END GENERATED: AI-SYSTEM-SYNC CHECKSUMS -->\n'
  );
  writeJson(repoRoot, 'Product Owner/claude-project.sync.json', {
    schemaVersion: 1,
    id: 'product-owner',
    skillRoot: 'sk-product-owner',
    skillId: 'product-owner',
    knowledgeRoot: 'claude project/knowledge',
    kernel: {
      path: 'claude project/Custom Instructions.md',
      version: '1.0.0',
      alignedSkillVersion: '1.0.0',
    },
    sourceCoverage: { include: ['sk-product-owner/SKILL.md'] },
    mirrors: [
      {
        source: 'sk-product-owner/SKILL.md',
        target: 'Product Owner - System - Skill - v1.0.0.md',
        sourceVersion: '1.0.0',
        projectVersion: '1.0.0',
      },
    ],
    contractInputs: ['claude project/Custom Instructions.md', 'sk-product-owner/SKILL.md'],
    validators: [],
    retiredNames: [],
    scanExcludes: [],
    expectedKnowledgeCount: 1,
    generatedRegions: [
      { target: 'SYNC.md', sections: ['INVENTORY'] },
      { target: 'claude project/README.md', sections: ['CHECKSUMS'] },
    ],
  });
  return { repoRoot, skillContent };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. TESTS
// ─────────────────────────────────────────────────────────────────────────────

test('sync --write renders mirrors and generated regions, then locks them', () => {
  const { repoRoot } = buildFixture();

  const result = runCli(['sync', '--system', 'product-owner', '--write'], repoRoot);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /applied \d+ change\(s\)/);

  const mirrorAbs = path.join(
    repoRoot,
    'Product Owner/claude project/knowledge/Product Owner - System - Skill - v1.0.0.md'
  );
  assert.equal(fs.readFileSync(mirrorAbs, 'utf8'), '# Fixture Skill\n\nBody text.\n');

  const syncMd = fs.readFileSync(path.join(repoRoot, 'Product Owner/SYNC.md'), 'utf8');
  assert.match(
    syncMd,
    /\| `sk-product-owner\/SKILL\.md` \| `Product Owner - System - Skill - v1\.0\.0\.md` \|/
  );
  assert.doesNotMatch(syncMd, /pending sync --write/);

  const readme = fs.readFileSync(
    path.join(repoRoot, 'Product Owner/claude project/README.md'),
    'utf8'
  );
  // Keep the single-mirror label unchanged because no shared prefix can be derived.
  assert.match(readme, /knowledge\/ Product Owner - System - Skill/);
  assert.doesNotMatch(readme, /pending sync --write/);

  const lockPath = path.join(repoRoot, 'Product Owner/claude project/package-lock.json');
  const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
  assert.equal(lock.files.length, 2);
  assert.equal(lock.regions.length, 2);
  const mirrorHash = hashFile(mirrorAbs);
  const mirrorRecord = lock.files.find((fileRecord) =>
    fileRecord.path.endsWith('Product Owner - System - Skill - v1.0.0.md')
  );
  assert.equal(mirrorRecord.sha256, mirrorHash.sha256);
});

test('a second sync --write against unchanged sources is a true no-op', () => {
  const { repoRoot } = buildFixture();
  const first = runCli(['sync', '--system', 'product-owner', '--write'], repoRoot);
  assert.equal(first.status, 0, first.stdout + first.stderr);

  const initialState = {
    syncMd: fs.readFileSync(path.join(repoRoot, 'Product Owner/SYNC.md'), 'utf8'),
    readme: fs.readFileSync(path.join(repoRoot, 'Product Owner/claude project/README.md'), 'utf8'),
    lock: fs.readFileSync(
      path.join(repoRoot, 'Product Owner/claude project/package-lock.json'),
      'utf8'
    ),
  };

  const second = runCli(['sync', '--system', 'product-owner', '--write'], repoRoot);
  assert.equal(second.status, 0, second.stdout + second.stderr);
  assert.match(second.stdout, /already up to date \(0 change\(s\)\)/);

  assert.equal(
    fs.readFileSync(path.join(repoRoot, 'Product Owner/SYNC.md'), 'utf8'),
    initialState.syncMd
  );
  assert.equal(
    fs.readFileSync(path.join(repoRoot, 'Product Owner/claude project/README.md'), 'utf8'),
    initialState.readme
  );
  // A no-op must not rewrite the lock because no content changed.
  assert.equal(
    fs.readFileSync(path.join(repoRoot, 'Product Owner/claude project/package-lock.json'), 'utf8'),
    initialState.lock
  );
});

test('sync --write rebuilds a missing package lock even when package bytes are current', () => {
  const { repoRoot } = buildFixture();
  const first = runCli(['sync', '--system', 'product-owner', '--write'], repoRoot);
  assert.equal(first.status, 0, first.stdout + first.stderr);
  const lockPath = path.join(repoRoot, 'Product Owner/claude project/package-lock.json');
  fs.unlinkSync(lockPath);

  const repair = runCli(['sync', '--system', 'product-owner', '--write'], repoRoot);
  assert.equal(repair.status, 0, repair.stdout + repair.stderr);
  assert.match(repair.stdout, /applied 1 change\(s\)/);
  assert.equal(fs.existsSync(lockPath), true);

  const noOp = runCli(['sync', '--system', 'product-owner', '--write'], repoRoot);
  assert.match(noOp.stdout, /already up to date \(0 change\(s\)\)/);
});

test('sync --write rejects manifest traversal before touching protected files', () => {
  const { repoRoot } = buildFixture();
  const manifestPath = path.join(repoRoot, 'Product Owner/claude-project.sync.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.mirrors[0].target = '../../../AGENTS.md';
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  const protectedPath = writeFile(repoRoot, 'AGENTS.md', 'protected\n');

  const result = runCli(['sync', '--system', 'product-owner', '--write'], repoRoot);
  assert.equal(result.status, 2);
  assert.match(result.stdout, /must not traverse|filename without directory components/);
  assert.equal(fs.readFileSync(protectedPath, 'utf8'), 'protected\n');
});

test('sync --write refuses when a declared generated-region target is missing its markers', () => {
  const { repoRoot } = buildFixture();
  // Remove markers to verify that sync refuses an unscaffolded target.
  fs.writeFileSync(path.join(repoRoot, 'Product Owner/SYNC.md'), '# Sync\n\nNo markers here.\n');

  const result = runCli(['sync', '--system', 'product-owner', '--write'], repoRoot);
  assert.equal(result.status, 2);
  assert.match(result.stdout, /generated region markers/);
});

test('check after sync --write reports the region body as reproduced, not drifted', () => {
  const { repoRoot } = buildFixture();
  runCli(['sync', '--system', 'product-owner', '--write'], repoRoot);
  const result = runCli(['check', '--system', 'product-owner'], repoRoot);
  // Review is intentionally absent, so only region reproduction is under test.
  assert.doesNotMatch(result.stdout, /REGION_DRIFT/);
  assert.doesNotMatch(result.stdout, /REGION_NOT_SCAFFOLDED/);
});

test('sync --write deterministically renders a declared derivation exception', () => {
  const repoRoot = mkTempRepo();
  writeFile(
    repoRoot,
    'Product Owner/sk-product-owner/SKILL.md',
    '---\nname: product-owner\nversion: 1.0.0\n---\n\n' +
      '# Raw Skill\n\n[Reference](./references/example.md)\n'
  );
  writeFile(repoRoot, 'Product Owner/sk-product-owner/references/example.md', '# Reference\n');
  writeFile(repoRoot, 'Product Owner/claude project/Custom Instructions.md', '# Fixture Kernel\n');
  writeFile(
    repoRoot,
    'Product Owner/claude project/knowledge/Product Owner - System - Skill - v1.0.0.md',
    'stale hand-applied content\n'
  );
  writeFile(
    repoRoot,
    'Product Owner/SYNC.md',
    '# Sync\n\n<!-- BEGIN GENERATED: AI-SYSTEM-SYNC INVENTORY -->\n' +
      '(pending)\n' +
      '<!-- END GENERATED: AI-SYSTEM-SYNC INVENTORY -->\n'
  );
  writeFile(
    repoRoot,
    'Product Owner/claude project/README.md',
    '# Project\n\n<!-- BEGIN GENERATED: AI-SYSTEM-SYNC CHECKSUMS -->\n' +
      '(pending)\n' +
      '<!-- END GENERATED: AI-SYSTEM-SYNC CHECKSUMS -->\n'
  );
  writeJson(repoRoot, 'Product Owner/claude-project.sync.json', {
    schemaVersion: 1,
    id: 'product-owner',
    skillRoot: 'sk-product-owner',
    skillId: 'product-owner',
    knowledgeRoot: 'claude project/knowledge',
    kernel: {
      path: 'claude project/Custom Instructions.md',
      version: '1.0.0',
      alignedSkillVersion: '1.0.0',
    },
    sourceCoverage: {
      include: ['sk-product-owner/SKILL.md', 'sk-product-owner/references/example.md'],
    },
    mirrors: [
      {
        source: 'sk-product-owner/SKILL.md',
        target: 'Product Owner - System - Skill - v1.0.0.md',
        sourceVersion: '1.0.0',
        projectVersion: '1.0.0',
      },
      {
        source: 'sk-product-owner/references/example.md',
        target: 'Product Owner - Reference - Example - v1.0.0.md',
        sourceVersion: '1.0.0',
        projectVersion: '1.0.0',
      },
    ],
    contractInputs: ['claude project/Custom Instructions.md', 'sk-product-owner/SKILL.md'],
    validators: [],
    retiredNames: [],
    scanExcludes: [],
    derivationExceptions: [
      {
        path: 'Product Owner - System - Skill - v1.0.0.md',
        reason: 'Retarget links and add Project retrieval metadata.',
        renderer: 'project-skill-mirror-v1',
        projectFrontmatter: {
          contextType: 'reference',
          importanceTier: 'high',
          triggerPhrases: ['product owner skill'],
        },
      },
    ],
    expectedKnowledgeCount: 2,
    generatedRegions: [
      { target: 'SYNC.md', sections: ['INVENTORY'] },
      { target: 'claude project/README.md', sections: ['CHECKSUMS'] },
    ],
  });

  const mirrorAbs = path.join(
    repoRoot,
    'Product Owner/claude project/knowledge/Product Owner - System - Skill - v1.0.0.md'
  );
  const result = runCli(['sync', '--system', 'product-owner', '--write'], repoRoot);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const rendered = fs.readFileSync(mirrorAbs, 'utf8');
  assert.match(rendered, /title: "Product Owner - System - Skill - v1\.0\.0"/);
  assert.match(rendered, /contextType: "reference"/);
  assert.match(rendered, /\[Reference\]\(<Product Owner - Reference - Example - v1\.0\.0\.md>\)/);
  assert.doesNotMatch(rendered, /stale hand-applied content/);

  const readme = fs.readFileSync(
    path.join(repoRoot, 'Product Owner/claude project/README.md'),
    'utf8'
  );
  assert.match(readme, new RegExp(hashFile(mirrorAbs).sha16));
});

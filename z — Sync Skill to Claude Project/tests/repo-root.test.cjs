// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ REPO ROOT TESTS                                                          ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { resolveRepoRoot, RepoRootError, ENV_OVERRIDE } = require('../lib/repo-root.cjs');
const { mkTempRepo } = require('./helpers.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. TESTS
// ─────────────────────────────────────────────────────────────────────────────

test('resolveRepoRoot honors the env override above every other signal', () => {
  const repoRoot = mkTempRepo();
  const resolved = resolveRepoRoot({
    env: { [ENV_OVERRIDE]: repoRoot },
    startDir: '/totally/unrelated/dir',
  });
  assert.equal(resolved, repoRoot);
});

test('resolveRepoRoot throws a clear error when the env override points nowhere', () => {
  assert.throws(
    () => resolveRepoRoot({ env: { [ENV_OVERRIDE]: '/does/not/exist/at/all' } }),
    RepoRootError
  );
});

test('resolveRepoRoot walks up from its own directory to find .git when no override is set', () => {
  const repoRoot = mkTempRepo();
  fs.mkdirSync(path.join(repoRoot, '.git'));
  const nested = path.join(repoRoot, 'deeply', 'nested', 'dir');
  fs.mkdirSync(nested, { recursive: true });
  const resolved = resolveRepoRoot({ env: {}, startDir: nested });
  assert.equal(resolved, repoRoot);
});

test('resolveRepoRoot finds .git at the starting directory itself, not only above it', () => {
  const repoRoot = mkTempRepo();
  fs.mkdirSync(path.join(repoRoot, '.git'));
  const resolved = resolveRepoRoot({ env: {}, startDir: repoRoot });
  assert.equal(resolved, repoRoot);
});

test('resolveRepoRoot throws when no .git exists anywhere above the starting directory', () => {
  // Keep the fixture outside any repository so the upward search has no match.
  const isolated = mkTempRepo();
  assert.throws(() => resolveRepoRoot({ env: {}, startDir: isolated }), RepoRootError);
});

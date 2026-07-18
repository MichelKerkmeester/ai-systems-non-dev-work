// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ MANIFEST TESTS                                                           ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const {
  loadManifest,
  validateManifestShape,
  ManifestMissingError,
  ManifestValidationError,
} = require('../lib/manifest.cjs');
const { mkTempRepo, buildCleanPackage } = require('./helpers.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. TESTS
// ─────────────────────────────────────────────────────────────────────────────

test('loadManifest throws ManifestMissingError when the file is absent', () => {
  const repoRoot = mkTempRepo();
  assert.throws(
    () => loadManifest(path.join(repoRoot, 'Nope'), 'claude-project.sync.json'),
    ManifestMissingError
  );
});

test('loadManifest accepts the fixture-generated manifest as-is', () => {
  const repoRoot = mkTempRepo();
  const { packageAbsRoot, entry } = buildCleanPackage(repoRoot);
  const { data } = loadManifest(packageAbsRoot, entry.manifestPath, entry);
  assert.equal(data.schemaVersion, 1);
  assert.equal(data.mirrors.length, 1);
});

test('loadManifest rejects an id/skillRoot mismatch against the registry entry', () => {
  const repoRoot = mkTempRepo();
  const { packageAbsRoot, entry } = buildCleanPackage(repoRoot);
  assert.throws(
    () => loadManifest(
      packageAbsRoot,
      entry.manifestPath,
      { id: 'someone-else', skillRoot: entry.skillRoot }
    ),
    ManifestValidationError
  );
});

test('validateManifestShape rejects mismatched expectedKnowledgeCount', () => {
  const repoRoot = mkTempRepo();
  const { packageAbsRoot, entry, manifest } = buildCleanPackage(repoRoot);
  const invalidManifest = { ...manifest, expectedKnowledgeCount: 99 };
  const { ok, problems } = validateManifestShape(invalidManifest, entry);
  assert.equal(ok, false);
  assert.ok(problems.some((problem) => problem.includes('expectedKnowledgeCount')));
});

test('validateManifestShape rejects duplicate mirror targets', () => {
  const repoRoot = mkTempRepo();
  const { entry, manifest } = buildCleanPackage(repoRoot);
  const invalidManifest = {
    ...manifest,
    mirrors: [manifest.mirrors[0], { ...manifest.mirrors[0], source: 'other/source.md' }],
    expectedKnowledgeCount: 2,
  };
  const { ok, problems } = validateManifestShape(invalidManifest, entry);
  assert.equal(ok, false);
  assert.ok(problems.some((problem) => problem.includes('duplicate target')));
});

test('validateManifestShape rejects unknown top-level fields', () => {
  const repoRoot = mkTempRepo();
  const { entry, manifest } = buildCleanPackage(repoRoot);
  const invalidManifest = { ...manifest, somethingUnexpected: true };
  const { ok, problems } = validateManifestShape(invalidManifest, entry);
  assert.equal(ok, false);
  assert.ok(problems.some((problem) => problem.includes('unknown manifest field')));
});

test('validateManifestShape rejects a fixed-path violation on knowledgeRoot/kernel.path', () => {
  const repoRoot = mkTempRepo();
  const { entry, manifest } = buildCleanPackage(repoRoot);
  const invalidManifest = { ...manifest, knowledgeRoot: 'somewhere/else' };
  const { ok, problems } = validateManifestShape(invalidManifest, entry);
  assert.equal(ok, false);
  assert.ok(problems.some((problem) => problem.includes('knowledgeRoot must be')));
});

test(
  'loadManifest surfaces invalid JSON as ManifestValidationError-free JSON error, not a crash',
  () => {
    const repoRoot = mkTempRepo();
    const packageRoot = path.join(repoRoot, 'Broken');
    const manifestPath = path.join(packageRoot, 'claude-project.sync.json');
    fs.mkdirSync(packageRoot, { recursive: true });
    fs.writeFileSync(manifestPath, '{ not valid json');
    assert.throws(() => loadManifest(packageRoot, 'claude-project.sync.json'));
  }
);

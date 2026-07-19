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

test('validateManifestShape rejects source, target, contract, region, and validator traversal', () => {
  const repoRoot = mkTempRepo();
  const { entry, manifest } = buildCleanPackage(repoRoot);
  const invalidManifest = structuredClone(manifest);
  invalidManifest.mirrors[0].source = '../AGENTS.md';
  invalidManifest.mirrors[0].target = '../../../AGENTS.md';
  invalidManifest.contractInputs = ['../AGENTS.md'];
  invalidManifest.validators = [{ name: 'escape', command: ['node'], cwd: '..' }];
  invalidManifest.generatedRegions = [{ target: '../AGENTS.md', sections: ['INVENTORY'] }];
  const { ok, problems } = validateManifestShape(invalidManifest, entry);
  assert.equal(ok, false);
  for (const field of ['mirrors[0].source', 'mirrors[0].target', 'contractInputs[0]', 'validators[0].cwd', 'generatedRegions[0].target']) {
    assert.ok(problems.some((problem) => problem.includes(field)), problems.join('; '));
  }
});

test('validateManifestShape rejects generated sections without a registered renderer', () => {
  const repoRoot = mkTempRepo();
  const { entry, manifest } = buildCleanPackage(repoRoot);
  manifest.generatedRegions = [{ target: 'SYNC.md', sections: ['PACKAGE FACTS'] }];
  const { ok, problems } = validateManifestShape(manifest, entry);
  assert.equal(ok, false);
  assert.ok(problems.some((problem) => problem.includes('unsupported renderer')));
});

test('validateManifestShape rejects duplicate generated-region targets and sections', () => {
  const repoRoot = mkTempRepo();
  const { entry, manifest } = buildCleanPackage(repoRoot);
  manifest.generatedRegions = [
    { target: 'SYNC.md', sections: ['INVENTORY', 'INVENTORY'] },
    { target: 'SYNC.md', sections: ['SMOKE_VERSION_PINS'] },
  ];
  const { ok, problems } = validateManifestShape(manifest, entry);
  assert.equal(ok, false);
  assert.ok(problems.some((problem) => problem.includes('duplicate renderer')));
  assert.ok(problems.some((problem) => problem.includes('duplicate targets')));
});

test('validateManifestShape rejects unknown fields in every nested schema object', () => {
  const repoRoot = mkTempRepo();
  const { entry, manifest } = buildCleanPackage(repoRoot);
  manifest.kernel.extra = true;
  manifest.sourceCoverage.extra = true;
  manifest.mirrors[0].extra = true;
  manifest.validators = [{ name: 'valid', command: ['node'], cwd: '.', extra: true }];
  manifest.generatedRegions = [{ target: 'SYNC.md', sections: ['INVENTORY'], extra: true }];
  const { ok, problems } = validateManifestShape(manifest, entry);
  assert.equal(ok, false);
  for (const label of ['kernel', 'sourceCoverage', 'mirrors[0]', 'validators[0]', 'generatedRegions[0]']) {
    assert.ok(
      problems.some((problem) => problem.includes(`${label} has unknown field`)),
      problems.join('; ')
    );
  }
});

test('validateManifestShape requires deterministic configuration for derivation exceptions', () => {
  const repoRoot = mkTempRepo();
  const { entry, manifest, mirrorTarget } = buildCleanPackage(repoRoot);
  manifest.derivationExceptions = [{ path: mirrorTarget, reason: 'manual content' }];
  const { ok, problems } = validateManifestShape(manifest, entry);
  assert.equal(ok, false);
  assert.ok(problems.some((problem) => problem.includes('renderer')));
  assert.ok(problems.some((problem) => problem.includes('projectFrontmatter')));
});

test(
  'loadManifest normalizes invalid JSON to ManifestValidationError',
  () => {
    const repoRoot = mkTempRepo();
    const packageRoot = path.join(repoRoot, 'Broken');
    const manifestPath = path.join(packageRoot, 'claude-project.sync.json');
    fs.mkdirSync(packageRoot, { recursive: true });
    fs.writeFileSync(manifestPath, '{ not valid json');
    assert.throws(
      () => loadManifest(packageRoot, 'claude-project.sync.json'),
      ManifestValidationError
    );
  }
);

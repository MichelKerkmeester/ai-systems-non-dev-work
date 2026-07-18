// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ RELEASE CHECK TESTS                                                      ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { releaseCheckSystem, CODE } = require('../lib/mechanical-checks.cjs');
const { computePackageDigest } = require('../lib/contract-digest.cjs');
const { EXIT } = require('../lib/exit-codes.cjs');
const { mkTempRepo, buildCleanPackage, writeJson } = require('./helpers.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function currentPackageDigest(packageAbsRoot, entry, manifest) {
  const mirrorTargets = manifest.mirrors.map(
    (mirror) => `claude project/knowledge/${mirror.target}`
  );
  return computePackageDigest(packageAbsRoot, entry.kernelPath, mirrorTargets);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. TESTS
// ─────────────────────────────────────────────────────────────────────────────

test('exit 6: no upload-receipt.json at all is reported as LIVE_RECEIPT_MISSING', () => {
  const repoRoot = mkTempRepo();
  const { entry } = buildCleanPackage(repoRoot);
  const result = releaseCheckSystem({ repoRoot, entry });
  assert.equal(result.exitCode, EXIT.LIVE_RECEIPT_STALE);
  assert.equal(result.findings[0].code, CODE.LIVE_RECEIPT_MISSING);
});

test('exit 6: a receipt recorded against an older package digest is stale', () => {
  const repoRoot = mkTempRepo();
  const { entry } = buildCleanPackage(repoRoot);
  writeJson(repoRoot, path.join(entry.packageRoot, 'claude project/upload-receipt.json'), {
    schemaVersion: 1,
    systemId: entry.id,
    uploadedAt: new Date(0).toISOString(),
    uploadedBy: 'test-operator',
    packageDigest: '0'.repeat(64),
    smokeResult: 'pass',
  });

  const result = releaseCheckSystem({ repoRoot, entry });
  assert.equal(result.exitCode, EXIT.LIVE_RECEIPT_STALE);
  assert.equal(result.findings[0].code, CODE.LIVE_RECEIPT_STALE);
});

test(
  'exit 6: a receipt whose smoke result did not pass is stale even with a matching digest',
  () => {
    const repoRoot = mkTempRepo();
    const { entry, packageAbsRoot, manifest } = buildCleanPackage(repoRoot);
    const digest = currentPackageDigest(packageAbsRoot, entry, manifest);
    writeJson(repoRoot, path.join(entry.packageRoot, 'claude project/upload-receipt.json'), {
      schemaVersion: 1,
      systemId: entry.id,
      uploadedAt: new Date(0).toISOString(),
      uploadedBy: 'test-operator',
      packageDigest: digest,
      smokeResult: 'fail',
    });

    const result = releaseCheckSystem({ repoRoot, entry });
    assert.equal(result.exitCode, EXIT.LIVE_RECEIPT_STALE);
  }
);

test(
  'exit 0: a receipt matching the current package digest with a passing smoke result is clean',
  () => {
    const repoRoot = mkTempRepo();
    const { entry, packageAbsRoot, manifest } = buildCleanPackage(repoRoot);
    const digest = currentPackageDigest(packageAbsRoot, entry, manifest);
    writeJson(repoRoot, path.join(entry.packageRoot, 'claude project/upload-receipt.json'), {
      schemaVersion: 1,
      systemId: entry.id,
      uploadedAt: new Date(0).toISOString(),
      uploadedBy: 'test-operator',
      packageDigest: digest,
      smokeResult: 'pass',
    });

    const result = releaseCheckSystem({ repoRoot, entry });
    assert.equal(result.exitCode, EXIT.CLEAN, JSON.stringify(result.findings));
  }
);

test(
  'release-check never reports local mechanical drift or kernel-review state ' +
    '(three states stay separate)',
  () => {
    const repoRoot = mkTempRepo();
    const { entry, packageAbsRoot, manifest } = buildCleanPackage(repoRoot, {
      withoutReview: true,
    });
    // Keep local review state dirty to prove the live receipt remains independently valid.
    const digest = currentPackageDigest(packageAbsRoot, entry, manifest);
    writeJson(repoRoot, path.join(entry.packageRoot, 'claude project/upload-receipt.json'), {
      schemaVersion: 1,
      systemId: entry.id,
      uploadedAt: new Date(0).toISOString(),
      uploadedBy: 'test-operator',
      packageDigest: digest,
      smokeResult: 'pass',
    });

    const result = releaseCheckSystem({ repoRoot, entry });
    assert.equal(result.exitCode, EXIT.CLEAN);
  }
);

test(
  'exit 2: release-check on a system with no manifest yet reports that, not a stale-receipt code',
  () => {
    const repoRoot = mkTempRepo();
    const entry = {
      id: 'ghost',
      packageRoot: 'Ghost',
      skillRoot: 'sk-ghost',
      kernelPath: 'claude project/Custom Instructions.md',
      manifestPath: 'claude-project.sync.json',
      validators: [],
    };
    fs.mkdirSync(path.join(repoRoot, entry.packageRoot), { recursive: true });
    const result = releaseCheckSystem({ repoRoot, entry });
    assert.equal(result.exitCode, EXIT.INVALID_MANIFEST_OR_PATHS);
  }
);

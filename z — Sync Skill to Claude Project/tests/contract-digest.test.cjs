// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ CONTRACT DIGEST TESTS                                                    ║
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
  computeContractDigest,
  computePackageDigest,
  ContractInputMissingError,
} = require('../lib/contract-digest.cjs');
const { mkTempRepo, writeFile } = require('./helpers.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. TESTS
// ─────────────────────────────────────────────────────────────────────────────

test('contract digest is deterministic across authoring order (sorts inputs first)', () => {
  const repoRoot = mkTempRepo();
  writeFile(repoRoot, 'AGENTS.md', 'agents content\n');
  writeFile(repoRoot, 'sk-x/SKILL.md', 'skill content\n');

  const firstDigest = computeContractDigest(repoRoot, ['AGENTS.md', 'sk-x/SKILL.md']);
  const secondDigest = computeContractDigest(repoRoot, ['sk-x/SKILL.md', 'AGENTS.md']);
  assert.equal(firstDigest, secondDigest);
});

test('contract digest changes when a contract input file changes', () => {
  const repoRoot = mkTempRepo();
  writeFile(repoRoot, 'AGENTS.md', 'v1\n');
  const beforeDigest = computeContractDigest(repoRoot, ['AGENTS.md']);

  writeFile(repoRoot, 'AGENTS.md', 'v2\n');
  const afterDigest = computeContractDigest(repoRoot, ['AGENTS.md']);

  assert.notEqual(beforeDigest, afterDigest);
});

test(
  'contract digest changes on a same-length content swap (length alone cannot hide a change)',
  () => {
    const repoRoot = mkTempRepo();
    writeFile(repoRoot, 'AGENTS.md', 'aaaa');
    const beforeDigest = computeContractDigest(repoRoot, ['AGENTS.md']);
    writeFile(repoRoot, 'AGENTS.md', 'bbbb');
    const afterDigest = computeContractDigest(repoRoot, ['AGENTS.md']);
    assert.notEqual(beforeDigest, afterDigest);
  }
);

test(
  'contract digest changes on a rename even if bytes are identical ' +
    '(path is part of the digest)',
  () => {
    const firstRepoRoot = mkTempRepo();
    writeFile(firstRepoRoot, 'a.md', 'same bytes\n');
    const firstDigest = computeContractDigest(firstRepoRoot, ['a.md']);

    const secondRepoRoot = mkTempRepo();
    writeFile(secondRepoRoot, 'b.md', 'same bytes\n');
    const secondDigest = computeContractDigest(secondRepoRoot, ['b.md']);

    assert.notEqual(firstDigest, secondDigest);
  }
);

test('contract digest throws a typed error for a missing contract input', () => {
  const repoRoot = mkTempRepo();
  assert.throws(() => computeContractDigest(repoRoot, ['missing.md']), ContractInputMissingError);
});

test('contract digest rejects an input symlink that escapes the repository', () => {
  const repoRoot = mkTempRepo();
  const packageRoot = path.join(repoRoot, 'Package');
  const externalRoot = mkTempRepo();
  fs.mkdirSync(packageRoot, { recursive: true });
  writeFile(externalRoot, 'outside.md', 'outside\n');
  fs.symlinkSync(path.join(externalRoot, 'outside.md'), path.join(packageRoot, 'contract.md'));
  assert.throws(
    () => computeContractDigest(packageRoot, ['contract.md']),
    ContractInputMissingError
  );
});

test('package digest covers kernel plus every mirror target, sorted', () => {
  const repoRoot = mkTempRepo();
  const kernelPath = 'claude project/Custom Instructions.md';
  writeFile(repoRoot, kernelPath, 'kernel\n');
  writeFile(repoRoot, 'claude project/knowledge/B.md', 'b\n');
  writeFile(repoRoot, 'claude project/knowledge/A.md', 'a\n');

  const firstPackageDigest = computePackageDigest(repoRoot, kernelPath, [
    'claude project/knowledge/A.md',
    'claude project/knowledge/B.md',
  ]);
  const secondPackageDigest = computePackageDigest(repoRoot, kernelPath, [
    'claude project/knowledge/B.md',
    'claude project/knowledge/A.md',
  ]);
  assert.equal(
    firstPackageDigest,
    secondPackageDigest,
    'order of mirrorTargets must not affect the digest'
  );

  writeFile(repoRoot, 'claude project/knowledge/A.md', 'a-changed\n');
  const changedPackageDigest = computePackageDigest(repoRoot, kernelPath, [
    'claude project/knowledge/A.md',
    'claude project/knowledge/B.md',
  ]);
  assert.notEqual(firstPackageDigest, changedPackageDigest);
});

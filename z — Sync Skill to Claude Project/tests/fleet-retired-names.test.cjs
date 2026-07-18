// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ FLEET RETIRED NAMES TESTS                                                ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const test = require('node:test');
const assert = require('node:assert/strict');

const { loadFleetRetiredNames } = require('../lib/mechanical-checks.cjs');
const { mkTempRepo, buildCleanPackage, registryOf } = require('./helpers.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. TESTS
// ─────────────────────────────────────────────────────────────────────────────

test(
  'loadFleetRetiredNames aggregates retiredNames across every loadable system, lowercased',
  () => {
    const repoRoot = mkTempRepo();
    const { entry: firstEntry } = buildCleanPackage(repoRoot, {
      id: 'sys-a',
      packageRoot: 'Sys A',
      retiredNames: ['Old-Name-A'],
    });
    const { entry: secondEntry } = buildCleanPackage(repoRoot, {
      id: 'sys-b',
      packageRoot: 'Sys B',
      retiredNames: ['Old-Name-B'],
    });

    const registry = registryOf(firstEntry, secondEntry);
    const retiredNames = loadFleetRetiredNames(repoRoot, registry);
    assert.ok(retiredNames.has('old-name-a'));
    assert.ok(retiredNames.has('old-name-b'));
  }
);

test('loadFleetRetiredNames silently skips a system whose manifest cannot be loaded', () => {
  const repoRoot = mkTempRepo();
  const { entry: firstEntry } = buildCleanPackage(repoRoot, {
    id: 'sys-a',
    packageRoot: 'Sys A',
    retiredNames: ['Old-Name-A'],
  });
  const ghostEntry = {
    id: 'ghost',
    packageRoot: 'Ghost',
    skillRoot: 'sk-ghost',
    kernelPath: 'claude project/Custom Instructions.md',
    manifestPath: 'claude-project.sync.json',
    validators: [],
  };
  const registry = registryOf(firstEntry, ghostEntry);
  const retiredNames = loadFleetRetiredNames(repoRoot, registry);
  assert.ok(retiredNames.has('old-name-a'));
  assert.equal(retiredNames.size, 1, 'the ghost system contributes nothing and does not throw');
});

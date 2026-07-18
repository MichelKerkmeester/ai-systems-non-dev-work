// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ REGISTRY TESTS                                                            ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const {
  validateRegistryShape,
  loadRegistry,
  findSystem,
  EXPECTED_SYSTEM_IDS,
  RegistryValidationError,
} = require('../lib/registry.cjs');
const { mkTempRepo, writeJson } = require('./helpers.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function validEntry(id, packageRoot) {
  return {
    id,
    packageRoot,
    skillRoot: `sk-${id}`,
    kernelPath: 'claude project/Custom Instructions.md',
    manifestPath: 'claude-project.sync.json',
    validators: [],
  };
}

function validRegistryData() {
  return {
    schemaVersion: 1,
    systems: EXPECTED_SYSTEM_IDS.map((id) => validEntry(id, id)),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. TESTS
// ─────────────────────────────────────────────────────────────────────────────

test(
  'the real registry.json in this package validates and declares exactly the ten expected ids',
  () => {
    const { systems } = loadRegistry();
    assert.equal(systems.length, 10);
    assert.deepEqual(
      systems.map((system) => system.id).sort(),
      [...EXPECTED_SYSTEM_IDS].sort()
    );
  }
);

test('validateRegistryShape accepts a well-formed ten-system registry', () => {
  const { ok, problems } = validateRegistryShape(validRegistryData());
  assert.equal(ok, true, problems.join('; '));
});

test('validateRegistryShape rejects a system count other than ten', () => {
  const data = validRegistryData();
  data.systems.pop();
  const { ok, problems } = validateRegistryShape(data);
  assert.equal(ok, false);
  assert.ok(problems.some((problem) => problem.includes('exactly 10')));
});

test('validateRegistryShape rejects an unexpected id swapped in for a real one', () => {
  const data = validRegistryData();
  data.systems[0] = validEntry('not-a-real-system', 'Not A Real System');
  const { ok, problems } = validateRegistryShape(data);
  assert.equal(ok, false);
  assert.ok(problems.some((problem) => problem.includes('missing required system id')));
  assert.ok(problems.some((problem) => problem.includes('unexpected system id')));
});

test('validateRegistryShape rejects duplicate ids/packageRoots/skillRoots', () => {
  const data = validRegistryData();
  data.systems[1] = { ...data.systems[1], id: data.systems[0].id };
  const { ok, problems } = validateRegistryShape(data);
  assert.equal(ok, false);
  assert.ok(problems.some((problem) => problem.includes('duplicate ids')));
});

test('validateRegistryShape rejects a wrong kernelPath', () => {
  const data = validRegistryData();
  data.systems[0].kernelPath = 'wrong/path.md';
  const { ok, problems } = validateRegistryShape(data);
  assert.equal(ok, false);
  assert.ok(problems.some((problem) => problem.includes('kernelPath must be')));
});

test(
  'loadRegistry throws RegistryValidationError with every problem listed, not just the first',
  () => {
    const fixtureRoot = mkTempRepo();
    const invalidRegistry = validRegistryData();
    invalidRegistry.systems = invalidRegistry.systems.slice(0, 3);
    // Keep count and required-ID errors together so the complete error list is tested.
    writeJson(fixtureRoot, 'registry.json', invalidRegistry);

    assert.throws(
      () => loadRegistry(path.join(fixtureRoot, 'lib')),
      (error) => {
        assert.ok(error instanceof RegistryValidationError);
        assert.ok(error.problems.length >= 2);
        return true;
      }
    );
  }
);

test('findSystem looks up by id and returns null for an unknown id', () => {
  const registry = { systems: validRegistryData().systems };
  assert.equal(findSystem(registry, EXPECTED_SYSTEM_IDS[0]).id, EXPECTED_SYSTEM_IDS[0]);
  assert.equal(findSystem(registry, 'nope'), null);
});

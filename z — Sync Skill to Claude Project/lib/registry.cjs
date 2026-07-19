// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ System Registry                                                          ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS/REQUIRES
// ─────────────────────────────────────────────────────────────────────────────

const path = require('node:path');
const { relativePathProblem } = require('./path-safety.cjs');
const {
  readJsonStrict,
  findDuplicates,
  JsonReadError,
  JsonParseError,
} = require('./util.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const REGISTRY_FILENAME = 'registry.json';

// The registry is the sole membership authority; the closed fleet size remains explicit.
const EXPECTED_SYSTEM_COUNT = 10;

const REQUIRED_ENTRY_FIELDS = [
  'id',
  'packageRoot',
  'skillRoot',
  'kernelPath',
  'manifestPath',
  'validators',
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Error raised when registry content violates the fleet contract. */
class RegistryValidationError extends Error {
  constructor(message, problems) {
    super(message);
    this.problems = problems || [message];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CORE LOGIC
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Validate parsed registry data.
 *
 * @param {*} data - Parsed registry value.
 * @returns {{ok: boolean, problems: string[]}} Validation result and messages.
 */
function validateRegistryShape(data) {
  const problems = [];

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return { ok: false, problems: ['registry.json must be a JSON object'] };
  }
  if (data.schemaVersion !== 1) {
    problems.push(
      `registry.json schemaVersion must be 1, got ${JSON.stringify(data.schemaVersion)}`
    );
  }
  if (!Array.isArray(data.systems)) {
    problems.push('registry.json "systems" must be an array');
    return { ok: false, problems };
  }
  if (data.systems.length !== EXPECTED_SYSTEM_COUNT) {
    problems.push(
      `registry.json must declare exactly ${EXPECTED_SYSTEM_COUNT} systems, ` +
      `found ${data.systems.length}`
    );
  }

  data.systems.forEach((entry, index) => {
    if (typeof entry !== 'object' || entry === null || Array.isArray(entry)) {
      problems.push(`systems[${index}] must be an object`);
      return;
    }
    for (const field of REQUIRED_ENTRY_FIELDS) {
      if (!(field in entry)) {
        problems.push(`systems[${index}] ("${entry.id || '?'}") missing required field "${field}"`);
      }
    }
    for (const field of ['id', 'packageRoot', 'skillRoot', 'kernelPath', 'manifestPath']) {
      if (field in entry && typeof entry[field] !== 'string') {
        problems.push(`systems[${index}].${field} must be a string`);
      }
    }
    if (typeof entry.id === 'string' && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id)) {
      problems.push(`systems[${index}].id must be a lowercase kebab-case identifier`);
    }
    if ('validators' in entry && !Array.isArray(entry.validators)) {
      problems.push(`systems[${index}].validators must be an array`);
    }
    if (
      typeof entry.kernelPath === 'string' &&
      entry.kernelPath !== 'claude project/Custom Instructions.md'
    ) {
      problems.push(
        `systems[${index}] ("${entry.id}").kernelPath must be ` +
          '"claude project/Custom Instructions.md", ' +
          `got "${entry.kernelPath}"`
      );
    }
    if (typeof entry.packageRoot === 'string') {
      const problem = relativePathProblem(entry.packageRoot, { basenameOnly: true });
      if (problem) problems.push(`systems[${index}].packageRoot ${problem}`);
    }
    if (typeof entry.skillRoot === 'string') {
      const problem = relativePathProblem(entry.skillRoot, { basenameOnly: true });
      if (problem) problems.push(`systems[${index}].skillRoot ${problem}`);
    }
    if (
      typeof entry.manifestPath === 'string' &&
      entry.manifestPath !== 'claude-project.sync.json'
    ) {
      problems.push(
        `systems[${index}] ("${entry.id}").manifestPath must be "claude-project.sync.json"`
      );
    }
  });

  const ids = data.systems
    .map((entry) => entry && entry.id)
    .filter((value) => typeof value === 'string');
  const dupIds = findDuplicates(ids);
  if (dupIds.length) problems.push(`registry.json has duplicate ids: ${dupIds.join(', ')}`);

  const roots = data.systems
    .map((entry) => entry && entry.packageRoot)
    .filter((value) => typeof value === 'string');
  const dupRoots = findDuplicates(roots);
  if (dupRoots.length) {
    problems.push(`registry.json has duplicate packageRoot values: ${dupRoots.join(', ')}`);
  }

  const skillRoots = data.systems
    .map((entry) => entry && entry.skillRoot)
    .filter((value) => typeof value === 'string');
  const dupSkillRoots = findDuplicates(skillRoots);
  if (dupSkillRoots.length) {
    problems.push(`registry.json has duplicate skillRoot values: ${dupSkillRoots.join(', ')}`);
  }

  return { ok: problems.length === 0, problems };
}

/**
 * Load and validate the registry relative to the tool directory.
 *
 * @param {string} [registryDir] - Directory containing the registry parent.
 * @returns {{path: string, systems: object[], schemaVersion: number}} Registry data.
 * @throws {RegistryValidationError} When registry content is invalid.
 */
function loadRegistry(registryDir) {
  const registryPath = path.join(registryDir || __dirname, '..', REGISTRY_FILENAME);
  let data;
  try {
    data = readJsonStrict(registryPath);
  } catch (err) {
    if (err instanceof JsonReadError || err instanceof JsonParseError) {
      const wrapped = new RegistryValidationError(
        `registry.json failed validation:\n  - ${err.message}`,
        [err.message]
      );
      wrapped.cause = err;
      throw wrapped;
    }
    throw err;
  }
  const { ok, problems } = validateRegistryShape(data);
  if (!ok) {
    throw new RegistryValidationError(
      `registry.json failed validation:\n  - ${problems.join('\n  - ')}`,
      problems
    );
  }
  return { path: registryPath, systems: data.systems, schemaVersion: data.schemaVersion };
}

/**
 * Find a registered system by identifier.
 *
 * @param {{systems: object[]}} registry - Loaded registry.
 * @param {string} id - System identifier.
 * @returns {object|null} Matching entry or null when absent.
 */
function findSystem(registry, id) {
  return registry.systems.find((s) => s.id === id) || null;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  REGISTRY_FILENAME,
  EXPECTED_SYSTEM_COUNT,
  REQUIRED_ENTRY_FIELDS,
  validateRegistryShape,
  loadRegistry,
  findSystem,
  RegistryValidationError,
};

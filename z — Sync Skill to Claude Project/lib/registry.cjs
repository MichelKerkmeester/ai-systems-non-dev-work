// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ System Registry                                                          ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS/REQUIRES
// ─────────────────────────────────────────────────────────────────────────────

const path = require('node:path');
const { readJsonStrict, findDuplicates } = require('./util.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const REGISTRY_FILENAME = 'registry.json';

// Keep the fleet closed so an unexpected directory cannot expand the managed systems.
const EXPECTED_SYSTEM_IDS = Object.freeze([
  'product-owner',
  'sales-communication',
  'sales-hubspot-automation',
  'media-editor',
  'linkedin-pieter-bertram',
  'linkedin-nigel-de-lange',
  'barter-deal-templates',
  'barter-copywriter',
  'barter-blog-posts',
  'prompt-improver',
]);

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
  if (data.systems.length !== EXPECTED_SYSTEM_IDS.length) {
    problems.push(
      `registry.json must declare exactly ${EXPECTED_SYSTEM_IDS.length} systems, ` +
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
    if (typeof entry.packageRoot === 'string' && path.isAbsolute(entry.packageRoot)) {
      problems.push(
        `systems[${index}] ("${entry.id}").packageRoot must be repo-root-relative, not absolute`
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

  const idSet = new Set(ids);
  const expectedSet = new Set(EXPECTED_SYSTEM_IDS);
  const missing = EXPECTED_SYSTEM_IDS.filter((id) => !idSet.has(id));
  const unexpected = ids.filter((id) => !expectedSet.has(id));
  if (missing.length) {
    problems.push(`registry.json is missing required system id(s): ${missing.join(', ')}`);
  }
  if (unexpected.length) {
    problems.push(`registry.json declares unexpected system id(s): ${unexpected.join(', ')}`);
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
  const data = readJsonStrict(registryPath);
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
  EXPECTED_SYSTEM_IDS,
  REQUIRED_ENTRY_FIELDS,
  validateRegistryShape,
  loadRegistry,
  findSystem,
  RegistryValidationError,
};

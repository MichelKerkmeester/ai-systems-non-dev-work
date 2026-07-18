// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Manifest Validation                                                      ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS/REQUIRES
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('node:fs');
const path = require('node:path');
const { readJsonStrict, findDuplicates } = require('./util.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const MANIFEST_FILENAME_DEFAULT = 'claude-project.sync.json';
const FIXED_KNOWLEDGE_ROOT = 'claude project/knowledge';
const FIXED_KERNEL_PATH = 'claude project/Custom Instructions.md';

// ─────────────────────────────────────────────────────────────────────────────
// 3. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Error raised when a package manifest is absent. */
class ManifestMissingError extends Error {}

/** Error raised when a package manifest violates its contract. */
class ManifestValidationError extends Error {
  constructor(message, problems) {
    super(message);
    this.problems = problems || [message];
  }
}

/**
 * Check whether a value is a non-empty string.
 *
 * @param {*} value - Value to inspect.
 * @returns {boolean} Whether the value is a non-empty string.
 */
function isNonEmptyString(value) {
  return typeof value === 'string' && value.length > 0;
}

/**
 * Check whether a value is an array containing only strings.
 *
 * @param {*} value - Value to inspect.
 * @returns {boolean} Whether the value is a string array.
 */
function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CORE LOGIC
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Validate a manifest object against the package contract.
 *
 * @param {*} data - Parsed manifest value.
 * @param {{id?: string, skillRoot?: string}} [expected] - Registry values to cross-check.
 * @returns {{ok: boolean, problems: string[]}} Validation result and messages.
 */
function validateManifestShape(data, expected) {
  const problems = [];
  const addProblem = (message) => problems.push(message);

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return { ok: false, problems: ['manifest must be a JSON object'] };
  }

  if (data.schemaVersion !== 1) {
    addProblem(`schemaVersion must be 1, got ${JSON.stringify(data.schemaVersion)}`);
  }
  if (!isNonEmptyString(data.id)) addProblem('id must be a non-empty string');
  else if (expected && expected.id && data.id !== expected.id) {
    addProblem(`id must equal registry id "${expected.id}", got "${data.id}"`);
  }
  if (!isNonEmptyString(data.skillRoot)) addProblem('skillRoot must be a non-empty string');
  else if (expected && expected.skillRoot && data.skillRoot !== expected.skillRoot) {
    addProblem(
      `skillRoot must equal registry skillRoot "${expected.skillRoot}", got "${data.skillRoot}"`
    );
  }
  if (!isNonEmptyString(data.skillId)) addProblem('skillId must be a non-empty string');
  if (data.knowledgeRoot !== FIXED_KNOWLEDGE_ROOT) {
    addProblem(
      `knowledgeRoot must be "${FIXED_KNOWLEDGE_ROOT}", got ${JSON.stringify(data.knowledgeRoot)}`
    );
  }

  if (typeof data.kernel !== 'object' || data.kernel === null) {
    addProblem('kernel must be an object');
  } else {
    if (data.kernel.path !== FIXED_KERNEL_PATH) {
      addProblem(
        `kernel.path must be "${FIXED_KERNEL_PATH}", got ${JSON.stringify(data.kernel.path)}`
      );
    }
    if (!isNonEmptyString(data.kernel.version)) {
      addProblem('kernel.version must be a non-empty string');
    }
    if (!isNonEmptyString(data.kernel.alignedSkillVersion)) {
      addProblem('kernel.alignedSkillVersion must be a non-empty string');
    }
  }

  if (typeof data.sourceCoverage !== 'object' || data.sourceCoverage === null) {
    addProblem('sourceCoverage must be an object');
  } else {
    if (!Array.isArray(data.sourceCoverage.include) || data.sourceCoverage.include.length === 0) {
      addProblem('sourceCoverage.include must be a non-empty array');
    } else if (!isStringArray(data.sourceCoverage.include)) {
      addProblem('sourceCoverage.include must contain only strings');
    }
    if ('exclude' in data.sourceCoverage && !isStringArray(data.sourceCoverage.exclude)) {
      addProblem('sourceCoverage.exclude must be an array of strings');
    }
  }

  if (!Array.isArray(data.mirrors) || data.mirrors.length === 0) {
    addProblem('mirrors must be a non-empty array');
  } else {
    data.mirrors.forEach((mirror, index) => {
      if (typeof mirror !== 'object' || mirror === null) {
        addProblem(`mirrors[${index}] must be an object`);
        return;
      }
      if (!isNonEmptyString(mirror.source)) {
        addProblem(`mirrors[${index}].source must be a non-empty string`);
      }
      if (!isNonEmptyString(mirror.target)) {
        addProblem(`mirrors[${index}].target must be a non-empty string`);
      }
      if (!('sourceVersion' in mirror) || typeof mirror.sourceVersion !== 'string') {
        addProblem(`mirrors[${index}].sourceVersion must be a string`);
      }
      if (!('projectVersion' in mirror) || typeof mirror.projectVersion !== 'string') {
        addProblem(`mirrors[${index}].projectVersion must be a string`);
      }
    });
    const sources = data.mirrors.map((mirror) => mirror && mirror.source).filter(Boolean);
    const targets = data.mirrors.map((mirror) => mirror && mirror.target).filter(Boolean);
    const dupSources = findDuplicates(sources);
    const dupTargets = findDuplicates(targets);
    if (dupSources.length) {
      addProblem(`mirrors has duplicate source paths: ${dupSources.join(', ')}`);
    }
    if (dupTargets.length) {
      addProblem(`mirrors has duplicate target filenames: ${dupTargets.join(', ')}`);
    }
  }

  if (!Array.isArray(data.contractInputs) || data.contractInputs.length === 0) {
    addProblem('contractInputs must be a non-empty array');
  } else if (!isStringArray(data.contractInputs)) {
    addProblem('contractInputs must contain only strings');
  }

  if ('validators' in data) {
    if (!Array.isArray(data.validators)) {
      addProblem('validators must be an array');
    } else {
      data.validators.forEach((validator, index) => {
        if (typeof validator !== 'object' || validator === null) {
          addProblem(`validators[${index}] must be an object`);
          return;
        }
        if (!isNonEmptyString(validator.name)) {
          addProblem(`validators[${index}].name must be a non-empty string`);
        }
        if (
          !Array.isArray(validator.command) ||
          validator.command.length === 0 ||
          !isStringArray(validator.command)
        ) {
          addProblem(`validators[${index}].command must be a non-empty array of strings`);
        }
        if (!isNonEmptyString(validator.cwd)) {
          addProblem(`validators[${index}].cwd must be a non-empty string`);
        }
      });
    }
  }

  if ('retiredNames' in data && !isStringArray(data.retiredNames)) {
    addProblem('retiredNames must be an array of strings');
  }
  if ('scanExcludes' in data && !isStringArray(data.scanExcludes)) {
    addProblem('scanExcludes must be an array of strings');
  }

  if (!Number.isInteger(data.expectedKnowledgeCount) || data.expectedKnowledgeCount < 0) {
    addProblem('expectedKnowledgeCount must be a non-negative integer');
  } else if (Array.isArray(data.mirrors) && data.expectedKnowledgeCount !== data.mirrors.length) {
    addProblem(
      `expectedKnowledgeCount (${data.expectedKnowledgeCount}) must equal the number of mirrors ` +
        `(${data.mirrors.length})`
    );
  }

  if ('derivationExceptions' in data) {
    if (!Array.isArray(data.derivationExceptions)) {
      addProblem('derivationExceptions must be an array');
    } else {
      data.derivationExceptions.forEach((exception, index) => {
        if (typeof exception !== 'object' || exception === null) {
          addProblem(`derivationExceptions[${index}] must be an object`);
          return;
        }
        if (!isNonEmptyString(exception.path)) {
          addProblem(`derivationExceptions[${index}].path must be a non-empty string`);
        }
        if (!isNonEmptyString(exception.reason)) {
          addProblem(`derivationExceptions[${index}].reason must be a non-empty string`);
        }
      });
    }
  }

  if ('generatedRegions' in data) {
    if (!Array.isArray(data.generatedRegions)) {
      addProblem('generatedRegions must be an array');
    } else {
      data.generatedRegions.forEach((region, index) => {
        if (typeof region !== 'object' || region === null) {
          addProblem(`generatedRegions[${index}] must be an object`);
          return;
        }
        if (!isNonEmptyString(region.target)) {
          addProblem(`generatedRegions[${index}].target must be a non-empty string`);
        }
        if (
          !Array.isArray(region.sections) ||
          region.sections.length === 0 ||
          !isStringArray(region.sections)
        ) {
          addProblem(`generatedRegions[${index}].sections must be a non-empty array of strings`);
        }
      });
    }
  }

  const allowedKeys = new Set([
    'schemaVersion', 'id', 'skillRoot', 'skillId', 'knowledgeRoot', 'kernel', 'sourceCoverage',
    'mirrors',
    'contractInputs',
    'validators',
    'retiredNames',
    'scanExcludes',
    'expectedKnowledgeCount',
    'derivationExceptions', 'generatedRegions',
  ]);
  for (const key of Object.keys(data)) {
    if (!allowedKeys.has(key)) addProblem(`unknown manifest field "${key}"`);
  }

  return { ok: problems.length === 0, problems };
}

/**
 * Load and validate a package manifest.
 *
 * @param {string} packageAbsRoot - Absolute path to the package root.
 * @param {string} manifestRelPath - Package-relative manifest path.
 * @param {{id: string, skillRoot: string}} [expected] - Registry values to cross-check.
 * @returns {{path: string, data: object}} Manifest path and parsed data.
 * @throws {ManifestMissingError} When the manifest is absent.
 * @throws {ManifestValidationError} When the manifest is invalid.
 */
function loadManifest(packageAbsRoot, manifestRelPath, expected) {
  const manifestAbsPath = path.join(packageAbsRoot, manifestRelPath || MANIFEST_FILENAME_DEFAULT);
  if (!fs.existsSync(manifestAbsPath)) {
    throw new ManifestMissingError(`Manifest not found: ${manifestAbsPath}`);
  }
  const data = readJsonStrict(manifestAbsPath);
  const { ok, problems } = validateManifestShape(data, expected);
  if (!ok) {
    throw new ManifestValidationError(
      `Manifest failed validation (${manifestAbsPath}):\n  - ${problems.join('\n  - ')}`,
      problems
    );
  }
  return { path: manifestAbsPath, data };
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  MANIFEST_FILENAME_DEFAULT,
  FIXED_KNOWLEDGE_ROOT,
  FIXED_KERNEL_PATH,
  validateManifestShape,
  loadManifest,
  ManifestMissingError,
  ManifestValidationError,
};

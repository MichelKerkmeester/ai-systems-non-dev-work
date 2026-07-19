// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Manifest Validation                                                      ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS/REQUIRES
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('node:fs');
const path = require('node:path');
const { PROJECT_SKILL_RENDERER } = require('./mirrors.cjs');
const {
  UnsafePathError,
  relativePathProblem,
  resolveContainedPath,
} = require('./path-safety.cjs');
const {
  readJsonStrict,
  findDuplicates,
  JsonReadError,
  JsonParseError,
} = require('./util.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const MANIFEST_FILENAME_DEFAULT = 'claude-project.sync.json';
const FIXED_KNOWLEDGE_ROOT = 'claude project/knowledge';
const FIXED_KERNEL_PATH = 'claude project/Custom Instructions.md';
const GENERATED_REGION_TARGETS = new Set(['SYNC.md', 'claude project/README.md']);
const GENERATED_REGION_SECTIONS = new Set(['INVENTORY', 'CHECKSUMS', 'SMOKE_VERSION_PINS']);

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

function isPathWithin(relativePath, root) {
  return relativePath === root || relativePath.startsWith(`${root}/`);
}

function validateRelativePath(value, label, addProblem, options) {
  const problem = relativePathProblem(value, options);
  if (problem) addProblem(`${label} ${problem}`);
  return !problem;
}

function validateObjectKeys(value, allowedKeys, label, addProblem) {
  for (const key of Object.keys(value)) {
    if (!allowedKeys.has(key)) addProblem(`${label} has unknown field "${key}"`);
  }
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
  } else {
    validateRelativePath(data.skillRoot, 'skillRoot', addProblem, { basenameOnly: true });
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
    validateObjectKeys(
      data.kernel,
      new Set(['path', 'version', 'alignedSkillVersion']),
      'kernel',
      addProblem
    );
  }

  if (typeof data.sourceCoverage !== 'object' || data.sourceCoverage === null) {
    addProblem('sourceCoverage must be an object');
  } else {
    if (!Array.isArray(data.sourceCoverage.include) || data.sourceCoverage.include.length === 0) {
      addProblem('sourceCoverage.include must be a non-empty array');
    } else if (!isStringArray(data.sourceCoverage.include)) {
      addProblem('sourceCoverage.include must contain only strings');
    } else {
      data.sourceCoverage.include.forEach((entry, index) => {
        if (
          validateRelativePath(entry, `sourceCoverage.include[${index}]`, addProblem) &&
          isNonEmptyString(data.skillRoot) &&
          !isPathWithin(entry, data.skillRoot)
        ) {
          addProblem(`sourceCoverage.include[${index}] must stay under skillRoot "${data.skillRoot}"`);
        }
      });
    }
    if ('exclude' in data.sourceCoverage && !isStringArray(data.sourceCoverage.exclude)) {
      addProblem('sourceCoverage.exclude must be an array of strings');
    } else if (Array.isArray(data.sourceCoverage.exclude)) {
      data.sourceCoverage.exclude.forEach((entry, index) => {
        if (
          validateRelativePath(entry, `sourceCoverage.exclude[${index}]`, addProblem) &&
          isNonEmptyString(data.skillRoot) &&
          !isPathWithin(entry, data.skillRoot)
        ) {
          addProblem(`sourceCoverage.exclude[${index}] must stay under skillRoot "${data.skillRoot}"`);
        }
      });
    }
    validateObjectKeys(
      data.sourceCoverage,
      new Set(['include', 'exclude']),
      'sourceCoverage',
      addProblem
    );
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
      } else if (
        validateRelativePath(mirror.source, `mirrors[${index}].source`, addProblem) &&
        isNonEmptyString(data.skillRoot) &&
        !isPathWithin(mirror.source, data.skillRoot)
      ) {
        addProblem(`mirrors[${index}].source must stay under skillRoot "${data.skillRoot}"`);
      }
      if (!isNonEmptyString(mirror.target)) {
        addProblem(`mirrors[${index}].target must be a non-empty string`);
      } else {
        validateRelativePath(mirror.target, `mirrors[${index}].target`, addProblem, {
          basenameOnly: true,
        });
      }
      if (!('sourceVersion' in mirror) || typeof mirror.sourceVersion !== 'string') {
        addProblem(`mirrors[${index}].sourceVersion must be a string`);
      }
      if (!('projectVersion' in mirror) || typeof mirror.projectVersion !== 'string') {
        addProblem(`mirrors[${index}].projectVersion must be a string`);
      }
      validateObjectKeys(
        mirror,
        new Set(['source', 'target', 'sourceVersion', 'projectVersion']),
        `mirrors[${index}]`,
        addProblem
      );
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
  } else {
    data.contractInputs.forEach((entry, index) =>
      validateRelativePath(entry, `contractInputs[${index}]`, addProblem)
    );
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
        } else {
          validateRelativePath(validator.cwd, `validators[${index}].cwd`, addProblem, {
            allowDot: true,
          });
        }
        validateObjectKeys(
          validator,
          new Set(['name', 'command', 'cwd']),
          `validators[${index}]`,
          addProblem
        );
      });
    }
  }

  if ('retiredNames' in data && !isStringArray(data.retiredNames)) {
    addProblem('retiredNames must be an array of strings');
  }
  if ('scanExcludes' in data) {
    if (!isStringArray(data.scanExcludes)) {
      addProblem('scanExcludes must be an array of strings');
    } else {
      data.scanExcludes.forEach((entry, index) =>
        validateRelativePath(entry, `scanExcludes[${index}]`, addProblem)
      );
    }
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
        } else {
          validateRelativePath(
            exception.path,
            `derivationExceptions[${index}].path`,
            addProblem,
            { basenameOnly: true }
          );
        }
        if (!isNonEmptyString(exception.reason)) {
          addProblem(`derivationExceptions[${index}].reason must be a non-empty string`);
        }
        if (exception.renderer !== PROJECT_SKILL_RENDERER) {
          addProblem(
            `derivationExceptions[${index}].renderer must be "${PROJECT_SKILL_RENDERER}"`
          );
        }
        const project = exception.projectFrontmatter;
        if (typeof project !== 'object' || project === null || Array.isArray(project)) {
          addProblem(`derivationExceptions[${index}].projectFrontmatter must be an object`);
        } else {
          if (!isNonEmptyString(project.contextType)) {
            addProblem(
              `derivationExceptions[${index}].projectFrontmatter.contextType must be a non-empty string`
            );
          }
          if (!isNonEmptyString(project.importanceTier)) {
            addProblem(
              `derivationExceptions[${index}].projectFrontmatter.importanceTier must be a non-empty string`
            );
          }
          if (!isStringArray(project.triggerPhrases) || project.triggerPhrases.length === 0) {
            addProblem(
              `derivationExceptions[${index}].projectFrontmatter.triggerPhrases must be a non-empty string array`
            );
          }
          const projectKeys = new Set(['contextType', 'importanceTier', 'triggerPhrases']);
          for (const key of Object.keys(project)) {
            if (!projectKeys.has(key)) {
              addProblem(`derivationExceptions[${index}].projectFrontmatter has unknown field "${key}"`);
            }
          }
        }
        const exceptionKeys = new Set(['path', 'reason', 'renderer', 'projectFrontmatter']);
        for (const key of Object.keys(exception)) {
          if (!exceptionKeys.has(key)) {
            addProblem(`derivationExceptions[${index}] has unknown field "${key}"`);
          }
        }
      });
      const exceptionPaths = data.derivationExceptions
        .map((exception) => exception && exception.path)
        .filter(Boolean);
      const duplicateExceptions = findDuplicates(exceptionPaths);
      if (duplicateExceptions.length) {
        addProblem(`derivationExceptions has duplicate paths: ${duplicateExceptions.join(', ')}`);
      }
      const mirrorTargets = new Set(
        Array.isArray(data.mirrors) ? data.mirrors.map((mirror) => mirror && mirror.target) : []
      );
      const undeclaredExceptions = exceptionPaths.filter((exceptionPath) => !mirrorTargets.has(exceptionPath));
      if (undeclaredExceptions.length) {
        addProblem(
          `derivationExceptions path(s) must match declared mirror targets: ${undeclaredExceptions.join(', ')}`
        );
      }
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
        } else if (
          validateRelativePath(region.target, `generatedRegions[${index}].target`, addProblem) &&
          !GENERATED_REGION_TARGETS.has(region.target)
        ) {
          addProblem(
            `generatedRegions[${index}].target must be one of: ${[...GENERATED_REGION_TARGETS].join(', ')}`
          );
        }
        if (
          !Array.isArray(region.sections) ||
          region.sections.length === 0 ||
          !isStringArray(region.sections)
        ) {
          addProblem(`generatedRegions[${index}].sections must be a non-empty array of strings`);
        } else {
          const unsupported = region.sections.filter(
            (section) => !GENERATED_REGION_SECTIONS.has(section)
          );
          if (unsupported.length) {
            addProblem(
              `generatedRegions[${index}].sections contains unsupported renderer(s): ${unsupported.join(', ')}`
            );
          }
          const duplicateSections = findDuplicates(region.sections);
          if (duplicateSections.length) {
            addProblem(
              `generatedRegions[${index}].sections has duplicate renderer(s): ` +
                duplicateSections.join(', ')
            );
          }
        }
        validateObjectKeys(
          region,
          new Set(['target', 'sections']),
          `generatedRegions[${index}]`,
          addProblem
        );
      });
      const regionTargets = data.generatedRegions
        .map((region) => region && region.target)
        .filter(Boolean);
      const duplicateTargets = findDuplicates(regionTargets);
      if (duplicateTargets.length) {
        addProblem(`generatedRegions has duplicate targets: ${duplicateTargets.join(', ')}`);
      }
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
  const logicalPath = manifestRelPath || MANIFEST_FILENAME_DEFAULT;
  const lexicalManifestPath = path.join(packageAbsRoot, logicalPath);
  if (!fs.existsSync(lexicalManifestPath)) {
    throw new ManifestMissingError(`Manifest not found: ${lexicalManifestPath}`);
  }
  let manifestAbsPath;
  try {
    manifestAbsPath = resolveContainedPath(packageAbsRoot, logicalPath, { mustExist: true });
  } catch (err) {
    if (err instanceof UnsafePathError) {
      throw new ManifestValidationError(
        `Manifest failed validation (${lexicalManifestPath}):\n  - ${err.message}`,
        [err.message]
      );
    }
    throw err;
  }
  let data;
  try {
    data = readJsonStrict(manifestAbsPath);
  } catch (err) {
    if (err instanceof JsonReadError || err instanceof JsonParseError) {
      const wrapped = new ManifestValidationError(
        `Manifest failed validation (${manifestAbsPath}):\n  - ${err.message}`,
        [err.message]
      );
      wrapped.cause = err;
      throw wrapped;
    }
    throw err;
  }
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
  GENERATED_REGION_TARGETS,
  GENERATED_REGION_SECTIONS,
  validateManifestShape,
  loadManifest,
  ManifestMissingError,
  ManifestValidationError,
};

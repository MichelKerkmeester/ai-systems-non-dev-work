// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Repository Root                                                          ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS/REQUIRES
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('node:fs');
const path = require('node:path');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const ENV_OVERRIDE = 'AI_SYSTEM_SYNC_REPO_ROOT';

// ─────────────────────────────────────────────────────────────────────────────
// 3. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Confirm that a candidate path is an existing directory.
 *
 * @param {string} candidate - Candidate repository root.
 * @param {string} source - Description of how the candidate was selected.
 * @returns {void}
 * @throws {RepoRootError} When the candidate is missing or not a directory.
 */
function assertRepoRoot(candidate, source) {
  let stat;
  try {
    stat = fs.statSync(candidate);
  } catch {
    throw new RepoRootError(`Repo root resolved via ${source} does not exist: ${candidate}`);
  }
  if (!stat.isDirectory()) {
    throw new RepoRootError(`Repo root resolved via ${source} is not a directory: ${candidate}`);
  }
}

/**
 * Walk upward until a directory containing `.git` is found.
 *
 * @param {string} startDir - Directory from which to begin the walk.
 * @returns {string|null} Repository root or null when no root is found.
 */
function walkUpForGit(startDir) {
  let directory = startDir;
  for (;;) {
    if (fs.existsSync(path.join(directory, '.git'))) return directory;
    const parent = path.dirname(directory);
    if (parent === directory) return null;
    directory = parent;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CORE LOGIC
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resolve the repo root for the running process.
 *
 * @param {{env?: object, startDir?: string}} [options] - Resolution options.
 * @returns {string} Absolute repository root.
 * @throws {RepoRootError} When no valid repository root can be found.
 */
function resolveRepoRoot(options) {
  const normalizedOptions = options || {};
  const env = normalizedOptions.env || process.env;

  const override = env[ENV_OVERRIDE];
  if (override) {
    const resolved = path.resolve(override);
    assertRepoRoot(resolved, `${ENV_OVERRIDE} override`);
    return resolved;
  }

  const gitRoot = walkUpForGit(normalizedOptions.startDir || __dirname);
  if (gitRoot) {
    return gitRoot;
  }

  throw new RepoRootError(
    'Could not resolve the repo root: no .git directory found above this script, and ' +
      `${ENV_OVERRIDE} is not set. Set ${ENV_OVERRIDE} to the target repo root explicitly.`
  );
}

/** Error raised when the repository root cannot be resolved. */
class RepoRootError extends Error {}

// ─────────────────────────────────────────────────────────────────────────────
// 5. EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  ENV_OVERRIDE,
  resolveRepoRoot,
  RepoRootError,
};

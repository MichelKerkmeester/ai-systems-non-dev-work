// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Git Utilities                                                            ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS/REQUIRES
// ─────────────────────────────────────────────────────────────────────────────

const { spawnSync } = require('node:child_process');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CORE LOGIC
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Run Git with captured output.
 *
 * @param {string[]} args - Arguments passed to Git.
 * @param {string} cwd - Working directory for the command.
 * @returns {{ok: boolean, stdout: string, stderr: string, status?: number}} Result details.
 */
function run(args, cwd) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  if (result.error) {
    return { ok: false, stdout: '', stderr: String(result.error.message || result.error) };
  }
  return {
    ok: result.status === 0,
    stdout: (result.stdout || '').trim(),
    stderr: (result.stderr || '').trim(),
    status: result.status,
  };
}

/**
 * Determine whether a directory is inside a Git work tree.
 *
 * @param {string} repoRoot - Directory to inspect.
 * @returns {boolean} Whether Git identifies the directory as a work tree.
 */
function isGitRepo(repoRoot) {
  const res = run(['rev-parse', '--is-inside-work-tree'], repoRoot);
  return res.ok && res.stdout === 'true';
}

/**
 * List files staged in the Git index.
 *
 * @param {string} repoRoot - Repository root used for the Git command.
 * @returns {string[]} Repository-root-relative staged paths.
 */
function stagedFiles(repoRoot) {
  const res = run(['diff', '--cached', '--name-only'], repoRoot);
  if (!res.ok) return [];
  return res.stdout ? res.stdout.split('\n').filter(Boolean) : [];
}

/**
 * Read staged content instead of the working-tree copy.
 *
 * @param {string} repoRoot - Repository root used for the Git command.
 * @param {string} relativePath - Repository-root-relative path.
 * @returns {Buffer|null} Staged bytes or null when Git cannot read them.
 */
function readStagedFile(repoRoot, relativePath) {
  const res = run(['show', `:${relativePath.split(require('node:path').sep).join('/')}`], repoRoot);
  if (!res.ok) return null;
  return Buffer.from(res.stdout, 'utf8');
}

/**
 * Find the last commit timestamp that touched a path.
 *
 * @param {string} repoRoot - Repository root used for the Git command.
 * @param {string} relativePath - Repository-root-relative path.
 * @returns {string|null} ISO-8601 timestamp or null when unavailable.
 */
function lastCommitTimestamp(repoRoot, relativePath) {
  const res = run(['log', '-1', '--format=%aI', '--', relativePath], repoRoot);
  if (!res.ok || !res.stdout) return null;
  return res.stdout;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = { isGitRepo, stagedFiles, readStagedFile, lastCommitTimestamp, run };

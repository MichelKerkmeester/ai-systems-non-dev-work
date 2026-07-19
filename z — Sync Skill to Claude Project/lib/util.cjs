// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Shared Utilities                                                         ║
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

// Skip filesystem metadata consistently so callers cannot disagree on inventory contents.
const IGNORED_BASENAMES = new Set(['.DS_Store']);

// ─────────────────────────────────────────────────────────────────────────────
// 3. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check whether a path resolves to a directory.
 *
 * @param {string} absolutePath - Path to inspect.
 * @returns {boolean} Whether the path resolves to a directory.
 */
function safeIsDirectory(absolutePath) {
  try {
    return fs.statSync(absolutePath).isDirectory();
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CORE LOGIC
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Recursively list regular files under a directory in stable order.
 *
 * @param {string} absoluteDirectory - Directory to walk.
 * @returns {string[]} Forward-slash paths relative to the directory.
 */
function walkFilesRecursive(absoluteDirectory) {
  const results = [];
  const stack = [absoluteDirectory];
  const visitedDirectories = new Set();
  while (stack.length) {
    const dir = stack.pop();
    let realDirectory;
    try {
      realDirectory = fs.realpathSync(dir);
    } catch {
      continue;
    }
    if (visitedDirectories.has(realDirectory)) continue;
    visitedDirectories.add(realDirectory);
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (IGNORED_BASENAMES.has(entry.name)) continue;
      const abs = path.join(dir, entry.name);
      const isDir = entry.isDirectory() || (entry.isSymbolicLink() && safeIsDirectory(abs));
      if (isDir) {
        stack.push(abs);
      } else {
        results.push(path.relative(absoluteDirectory, abs).split(path.sep).join('/'));
      }
    }
  }
  return sortStable(results);
}

/**
 * Sort values lexicographically while preserving equal-key order.
 *
 * @param {Array} array - Values to sort.
 * @param {Function} [keyFn] - Optional function that returns comparison keys.
 * @returns {Array} A newly ordered array.
 */
function sortStable(array, keyFn) {
  const withIndex = array.map((item, index) => ({ item, index }));
  withIndex.sort((a, b) => {
    const ka = keyFn ? keyFn(a.item) : a.item;
    const kb = keyFn ? keyFn(b.item) : b.item;
    if (ka < kb) return -1;
    if (ka > kb) return 1;
    return a.index - b.index;
  });
  return withIndex.map((entry) => entry.item);
}

/**
 * Read and parse a JSON file with typed read and parse errors.
 *
 * @param {string} absolutePath - Absolute path to the JSON file.
 * @returns {*} Parsed JSON value.
 * @throws {JsonReadError} When the file cannot be read.
 * @throws {JsonParseError} When the file is not valid JSON.
 */
function readJsonStrict(absolutePath) {
  let raw;
  try {
    raw = fs.readFileSync(absolutePath, 'utf8');
  } catch (err) {
    throw new JsonReadError(`Cannot read ${absolutePath}: ${err.code || err.message}`, {
      cause: err,
    });
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new JsonParseError(`Invalid JSON in ${absolutePath}: ${err.message}`, { cause: err });
  }
}

/**
 * Find groups of values that collide case-insensitively.
 *
 * @param {string[]} values - Values to compare.
 * @returns {string[][]} Colliding groups containing at least two values.
 */
function findCaseInsensitiveCollisions(values) {
  const byLower = new Map();
  for (const value of values) {
    const key = value.toLowerCase();
    if (!byLower.has(key)) byLower.set(key, []);
    byLower.get(key).push(value);
  }
  const collisions = [];
  for (const group of byLower.values()) {
    if (group.length > 1) collisions.push(group);
  }
  return collisions;
}

/**
 * Find duplicate values while preserving first-seen order.
 *
 * @param {Array} values - Values to inspect.
 * @returns {Array} Duplicate values.
 */
function findDuplicates(values) {
  const seen = new Map();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.set(value, true);
  }
  return [...duplicates];
}

/** Error raised when a JSON file cannot be read. */
class JsonReadError extends Error {}

/** Error raised when a JSON file cannot be parsed. */
class JsonParseError extends Error {}

// ─────────────────────────────────────────────────────────────────────────────
// 5. EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  sortStable,
  readJsonStrict,
  findCaseInsensitiveCollisions,
  findDuplicates,
  walkFilesRecursive,
  IGNORED_BASENAMES,
  JsonReadError,
  JsonParseError,
};

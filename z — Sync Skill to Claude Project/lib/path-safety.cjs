// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Path Safety                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

const fs = require('node:fs');
const path = require('node:path');

class UnsafePathError extends Error {}

function isPathInside(parentAbs, childAbs) {
  const relative = path.relative(parentAbs, childAbs);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function relativePathProblem(value, options) {
  const normalizedOptions = options || {};
  if (typeof value !== 'string' || value.length === 0) return 'must be a non-empty string';
  if (value.includes('\0')) return 'must not contain a NUL byte';
  if (value.includes('\\')) return 'must use forward slashes';
  if (path.posix.isAbsolute(value) || path.win32.isAbsolute(value)) return 'must be relative';
  if (value === '.' && normalizedOptions.allowDot) return null;
  if (value === '.' || value === '..' || value.startsWith('../') || value.includes('/../')) {
    return 'must not traverse outside its root';
  }
  if (value.startsWith('./') || value.endsWith('/') || value.includes('//')) {
    return 'must be a normalized relative path';
  }
  if (path.posix.normalize(value) !== value) return 'must be a normalized relative path';
  if (normalizedOptions.basenameOnly && path.posix.basename(value) !== value) {
    return 'must be a filename without directory components';
  }
  return null;
}

function nearestExistingPath(absolutePath) {
  let candidate = absolutePath;
  while (!fs.existsSync(candidate)) {
    const parent = path.dirname(candidate);
    if (parent === candidate) return null;
    candidate = parent;
  }
  return candidate;
}

/**
 * Resolve a relative path while enforcing lexical and existing-ancestor containment.
 * Source symlinks may use a wider real boundary, such as the repository root.
 */
function resolveContainedPath(baseAbs, relativePath, options) {
  const normalizedOptions = options || {};
  const problem = relativePathProblem(relativePath, {
    allowDot: normalizedOptions.allowDot,
    basenameOnly: normalizedOptions.basenameOnly,
  });
  if (problem) throw new UnsafePathError(`Unsafe path "${relativePath}": ${problem}`);

  const resolvedBase = path.resolve(baseAbs);
  const resolved = relativePath === '.' ? resolvedBase : path.resolve(resolvedBase, relativePath);
  if (!isPathInside(resolvedBase, resolved)) {
    throw new UnsafePathError(`Path escapes its lexical root: ${relativePath}`);
  }

  const realBoundary = fs.realpathSync(path.resolve(normalizedOptions.realBoundaryAbs || resolvedBase));
  const existing = nearestExistingPath(resolved);
  if (existing) {
    const realExisting = fs.realpathSync(existing);
    if (!isPathInside(realBoundary, realExisting)) {
      throw new UnsafePathError(`Path resolves outside its allowed boundary: ${relativePath}`);
    }
  }
  if (normalizedOptions.mustExist && !fs.existsSync(resolved)) {
    throw new UnsafePathError(`Required path does not exist: ${relativePath}`);
  }
  return resolved;
}

module.exports = {
  UnsafePathError,
  isPathInside,
  relativePathProblem,
  resolveContainedPath,
};

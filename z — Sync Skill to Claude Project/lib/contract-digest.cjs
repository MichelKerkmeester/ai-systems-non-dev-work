// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Contract Digest                                                          ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS/REQUIRES
// ─────────────────────────────────────────────────────────────────────────────

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const DOMAIN_PREFIX = 'ai-system-contract-v1\0';
const PACKAGE_DOMAIN_PREFIX = 'ai-system-package-v1\0';

// ─────────────────────────────────────────────────────────────────────────────
// 3. CORE LOGIC
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Compute the canonical contract digest from sorted, dereferenced inputs.
 * Sorting keeps the digest independent of manifest authoring order, while
 * including each path and byte length prevents ambiguous concatenations.
 *
 * @param {string} packageRoot - Absolute path to the package root.
 * @param {string[]} contractInputs - Package-root-relative logical paths.
 * @returns {string} The hexadecimal SHA-256 contract digest.
 * @throws {ContractInputMissingError} When an input cannot be read.
 */
function computeContractDigest(packageRoot, contractInputs) {
  const sorted = [...contractInputs].sort();
  const hash = crypto.createHash('sha256');
  hash.update(DOMAIN_PREFIX, 'utf8');
  for (const logicalPath of sorted) {
    const absolute = path.join(packageRoot, logicalPath);
    let bytes;
    try {
      bytes = fs.readFileSync(absolute);
    } catch (err) {
      const wrapped = new ContractInputMissingError(
        `Contract input not readable: ${logicalPath} (${err.code || err.message})`
      );
      wrapped.logicalPath = logicalPath;
      wrapped.cause = err;
      throw wrapped;
    }
    hash.update(logicalPath, 'utf8');
    hash.update('\0', 'utf8');
    hash.update(String(bytes.length), 'utf8');
    hash.update('\0', 'utf8');
    hash.update(bytes);
  }
  return hash.digest('hex');
}

/**
 * Compute the full package digest from the kernel and mirror bytes.
 *
 * @param {string} packageRoot - Absolute path to the package root.
 * @param {string} kernelRelPath - Package-root-relative kernel path.
 * @param {string[]} mirrorTargets - Package-root-relative mirror paths.
 * @returns {string} The hexadecimal SHA-256 package digest.
 * @throws {ContractInputMissingError} When a package file cannot be read.
 */
function computePackageDigest(packageRoot, kernelRelPath, mirrorTargets) {
  const entries = [kernelRelPath, ...mirrorTargets].sort();
  const hash = crypto.createHash('sha256');
  hash.update(PACKAGE_DOMAIN_PREFIX, 'utf8');
  for (const relPath of entries) {
    const absolute = path.join(packageRoot, relPath);
    let bytes;
    try {
      bytes = fs.readFileSync(absolute);
    } catch (err) {
      const wrapped = new ContractInputMissingError(
        `Package file not readable: ${relPath} (${err.code || err.message})`
      );
      wrapped.logicalPath = relPath;
      wrapped.cause = err;
      throw wrapped;
    }
    hash.update(relPath, 'utf8');
    hash.update('\0', 'utf8');
    hash.update(String(bytes.length), 'utf8');
    hash.update('\0', 'utf8');
    hash.update(bytes);
  }
  return hash.digest('hex');
}

/** Error raised when a digest input is unavailable. */
class ContractInputMissingError extends Error {}

// ─────────────────────────────────────────────────────────────────────────────
// 4. EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  computeContractDigest,
  computePackageDigest,
  ContractInputMissingError,
  DOMAIN_PREFIX,
  PACKAGE_DOMAIN_PREFIX,
};

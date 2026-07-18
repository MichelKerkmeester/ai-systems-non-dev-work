// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Hashing Utilities                                                        ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS/REQUIRES
// ─────────────────────────────────────────────────────────────────────────────

const crypto = require('node:crypto');
const fs = require('node:fs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const PREFIX_LENGTH = 16;

// ─────────────────────────────────────────────────────────────────────────────
// 3. CORE LOGIC
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hash an input with SHA-256.
 *
 * @param {string|Buffer} input - Bytes or text to hash.
 * @returns {string} Lowercase hexadecimal SHA-256 digest.
 */
function sha256Hex(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * Return the standard sixteen-character hash prefix.
 *
 * @param {string|Buffer} hexOrInput - Full digest, bytes or text to hash.
 * @returns {string} Sixteen-character hexadecimal prefix.
 */
function sha16(hexOrInput) {
  const hex = typeof hexOrInput === 'string' && /^[0-9a-f]{64}$/i.test(hexOrInput)
    ? hexOrInput
    : sha256Hex(hexOrInput);
  return hex.slice(0, PREFIX_LENGTH);
}

/**
 * Read and hash a file's dereferenced bytes.
 *
 * @param {string} absolutePath - Absolute path to the file.
 * @returns {{sha256: string, sha16: string, bytes: number, buffer: Buffer}} Hash details.
 */
function hashFile(absolutePath) {
  const bytes = fs.readFileSync(absolutePath);
  const sha256 = sha256Hex(bytes);
  return { sha256, sha16: sha256.slice(0, PREFIX_LENGTH), bytes: bytes.length, buffer: bytes };
}

/**
 * Check whether a value is a sixteen-character SHA-256 prefix.
 *
 * @param {*} value - Value to inspect.
 * @returns {boolean} Whether the value matches the expected format.
 */
function isSha16(value) {
  return typeof value === 'string' && /^[0-9a-f]{16}$/i.test(value);
}

/**
 * Check whether a value is a complete SHA-256 digest.
 *
 * @param {*} value - Value to inspect.
 * @returns {boolean} Whether the value matches the expected format.
 */
function isSha256(value) {
  return typeof value === 'string' && /^[0-9a-f]{64}$/i.test(value);
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = { PREFIX_LENGTH, sha256Hex, sha16, hashFile, isSha16, isSha256 };

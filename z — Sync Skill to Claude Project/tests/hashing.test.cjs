// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ HASHING TESTS                                                            ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { sha256Hex, sha16, hashFile, isSha16, isSha256 } = require('../lib/hashing.cjs');
const { mkTempRepo, writeFile } = require('./helpers.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. TESTS
// ─────────────────────────────────────────────────────────────────────────────

test('sha16 is always the first 16 hex chars of sha256Hex', () => {
  const fullDigest = sha256Hex('hello world');
  assert.equal(fullDigest.length, 64);
  assert.equal(sha16('hello world'), fullDigest.slice(0, 16));
});

test('sha16 accepts a precomputed 64-char hex and reuses it instead of rehashing', () => {
  const fullDigest = sha256Hex('some content');
  assert.equal(sha16(fullDigest), fullDigest.slice(0, 16));
});

test('hashFile dereferences a symlink to the real target bytes', () => {
  const repoRoot = mkTempRepo();
  const targetAbs = writeFile(repoRoot, 'real.md', 'the actual bytes\n');
  const linkAbs = path.join(repoRoot, 'linked.md');
  fs.symlinkSync(targetAbs, linkAbs);

  const directHash = hashFile(targetAbs);
  const linkHash = hashFile(linkAbs);
  assert.equal(linkHash.sha256, directHash.sha256);
  assert.equal(linkHash.bytes, directHash.bytes);
});

test('hashFile throws on a missing file rather than silently hashing nothing', () => {
  const repoRoot = mkTempRepo();
  assert.throws(() => hashFile(path.join(repoRoot, 'does-not-exist.md')));
});

test('isSha16 / isSha256 validate format only', () => {
  assert.equal(isSha16('a'.repeat(16)), true);
  assert.equal(isSha16('a'.repeat(15)), false);
  assert.equal(isSha16('z'.repeat(16)), false);
  assert.equal(isSha256('b'.repeat(64)), true);
  assert.equal(isSha256('b'.repeat(63)), false);
});

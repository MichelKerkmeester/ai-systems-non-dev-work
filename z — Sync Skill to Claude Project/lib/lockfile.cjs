// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Package Lock State                                                       ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const { hashFile } = require('./hashing.cjs');
const { FIXED_KNOWLEDGE_ROOT } = require('./manifest.cjs');
const { LOCK_REL_PATH } = require('./paths.cjs');
const { readJsonStrict } = require('./util.cjs');

function buildLockState({ packageAbsRoot, entry, manifest, regionShas }) {
  const files = [];
  const kernelHash = hashFile(path.join(packageAbsRoot, entry.kernelPath));
  files.push({
    path: entry.kernelPath,
    sha256: kernelHash.sha256,
    sha16: kernelHash.sha16,
    bytes: kernelHash.bytes,
  });
  for (const mirror of manifest.mirrors) {
    const targetRel = `${FIXED_KNOWLEDGE_ROOT}/${mirror.target}`;
    const hash = hashFile(path.join(packageAbsRoot, targetRel));
    files.push({ path: targetRel, sha256: hash.sha256, sha16: hash.sha16, bytes: hash.bytes });
  }
  return {
    schemaVersion: 1,
    systemId: entry.id,
    files,
    regions: regionShas,
    deletable: manifest.mirrors.map((mirror) => `${FIXED_KNOWLEDGE_ROOT}/${mirror.target}`),
  };
}

function comparableLock(lock) {
  if (!lock || typeof lock !== 'object' || Array.isArray(lock)) return null;
  return {
    schemaVersion: lock.schemaVersion,
    systemId: lock.systemId,
    files: lock.files,
    regions: lock.regions,
    deletable: lock.deletable,
  };
}

function renderLockContentIfChanged(context) {
  const desired = buildLockState(context);
  const lockAbs = path.join(context.packageAbsRoot, LOCK_REL_PATH);
  if (fs.existsSync(lockAbs)) {
    try {
      const existing = readJsonStrict(lockAbs);
      if (JSON.stringify(comparableLock(existing)) === JSON.stringify(desired)) return null;
    } catch {
      // Invalid lock state is replaced by the compiler transaction.
    }
  }
  return Buffer.from(
    `${JSON.stringify({ ...desired, generatedAt: new Date().toISOString() }, null, 2)}\n`,
    'utf8'
  );
}

module.exports = { buildLockState, comparableLock, renderLockContentIfChanged };

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Mechanical Checks                                                        ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS/REQUIRES
// ─────────────────────────────────────────────────────────────────────────────

const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const { computeContractDigest, computePackageDigest, ContractInputMissingError } = require('./contract-digest.cjs');
const { EXIT, worstExitCode } = require('./exit-codes.cjs');
const { hashFile, isSha16, isSha256, sha256Hex } = require('./hashing.cjs');
const { loadManifest, ManifestMissingError, ManifestValidationError, FIXED_KNOWLEDGE_ROOT } = require('./manifest.cjs');
const { MirrorRenderError, renderMirrorBytes } = require('./mirrors.cjs');
const {
  UnsafePathError,
  resolveContainedPath,
  resolvePackageRoot,
} = require('./path-safety.cjs');
const { JOURNAL_REL_PATH, LOCK_REL_PATH, KERNEL_REVIEW_REL_PATH, UPLOAD_RECEIPT_REL_PATH } = require('./paths.cjs');
const { renderSection } = require('./render.cjs');
const { extractRegion } = require('./regions.cjs');
const { inspectRepoLock } = require('./transaction.cjs');
const {
  readJsonStrict,
  findCaseInsensitiveCollisions,
  walkFilesRecursive,
  JsonReadError,
  JsonParseError,
} = require('./util.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const CODE = Object.freeze({
  SYNC_IN_PROGRESS: 'SYNC_IN_PROGRESS',
  INTERRUPTED_TRANSACTION: 'INTERRUPTED_TRANSACTION',
  PACKAGE_ROOT_MISSING: 'PACKAGE_ROOT_MISSING',
  MANIFEST_MISSING: 'MANIFEST_MISSING',
  MANIFEST_INVALID: 'MANIFEST_INVALID',
  SOURCE_MISSING: 'SOURCE_MISSING',
  SYMLINK_BROKEN: 'SYMLINK_BROKEN',
  SYMLINK_ESCAPES_REPO: 'SYMLINK_ESCAPES_REPO',
  UNMAPPED_SOURCE: 'UNMAPPED_SOURCE',
  DUPLICATE_TARGET_CASE: 'DUPLICATE_TARGET_CASE',
  KNOWLEDGE_DIR_MISSING: 'KNOWLEDGE_DIR_MISSING',
  UNKNOWN_KNOWLEDGE_FILE: 'UNKNOWN_KNOWLEDGE_FILE',
  MISSING_KNOWLEDGE_FILE: 'MISSING_KNOWLEDGE_FILE',
  KNOWLEDGE_COUNT_MISMATCH: 'KNOWLEDGE_COUNT_MISMATCH',
  MIRROR_BYTE_MISMATCH: 'MIRROR_BYTE_MISMATCH',
  LOCK_MISSING: 'LOCK_MISSING',
  LOCK_STRUCTURE_MISMATCH: 'LOCK_STRUCTURE_MISMATCH',
  LOCK_HASH_MISMATCH: 'LOCK_HASH_MISMATCH',
  HASH_PREFIX_MISMATCH: 'HASH_PREFIX_MISMATCH',
  REGION_NOT_SCAFFOLDED: 'REGION_NOT_SCAFFOLDED',
  REGION_DRIFT: 'REGION_DRIFT',
  RETIRED_TOKEN_FOUND: 'RETIRED_TOKEN_FOUND',
  GRAPH_TARGET_RETIRED: 'GRAPH_TARGET_RETIRED',
  JSON_FILE_MISSING: 'JSON_FILE_MISSING',
  JSON_INVALID: 'JSON_INVALID',
  KERNEL_REVIEW_REQUIRED: 'KERNEL_REVIEW_REQUIRED',
  VALIDATOR_FAILED: 'VALIDATOR_FAILED',
  LIVE_RECEIPT_MISSING: 'LIVE_RECEIPT_MISSING',
  LIVE_RECEIPT_STALE: 'LIVE_RECEIPT_STALE',
});

const BINARY_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.pdf',
  '.zip',
  '.ico',
  '.woff',
  '.woff2',
]);

// ─────────────────────────────────────────────────────────────────────────────
// 3. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build a tagged mechanical-check finding.
 *
 * @param {string} code - Finding code.
 * @param {number} exitCode - Exit code contributed by the finding.
 * @param {string} message - Human-readable finding message.
 * @param {object} [extra] - Additional finding fields.
 * @returns {object} Finding record.
 */
function finding(code, exitCode, message, extra) {
  return { code, exitCode, message, ...(extra || {}) };
}

/**
 * Determine whether a path is contained by another path.
 *
 * @param {string} parentAbs - Parent absolute path.
 * @param {string} childAbs - Candidate child absolute path.
 * @returns {boolean} Whether the child is inside the parent.
 */
function isPathInside(parentAbs, childAbs) {
  const rel = path.relative(parentAbs, childAbs);
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

/**
 * Expand one source-coverage entry into package-relative file paths.
 *
 * @param {string} packageAbsRoot - Absolute package root.
 * @param {string} relPath - Package-relative file or directory path.
 * @returns {{missing: boolean, files: string[]}} Expansion result.
 */
function expandCoverageEntry(repoAbsRoot, packageAbsRoot, relPath) {
  const realRepoRoot = fs.realpathSync(repoAbsRoot);
  let abs;
  try {
    abs = resolveContainedPath(packageAbsRoot, relPath, {
      mustExist: true,
      realBoundaryAbs: repoAbsRoot,
    });
  } catch (err) {
    if (err instanceof UnsafePathError) {
      return { missing: !fs.existsSync(path.join(packageAbsRoot, relPath)), files: [], unsafe: [err.message] };
    }
    throw err;
  }
  let stat;
  try {
    stat = fs.statSync(abs);
  } catch {
    return { missing: true, files: [], unsafe: [] };
  }
  if (stat.isDirectory()) {
    const files = [];
    const unsafe = [];
    const visited = new Set();
    const stack = [{ absolutePath: abs, relativePath: relPath.replace(/\/$/, '') }];
    while (stack.length) {
      const current = stack.pop();
      let realDirectory;
      try {
        realDirectory = fs.realpathSync(current.absolutePath);
      } catch {
        unsafe.push(`Broken coverage path: ${current.relativePath}`);
        continue;
      }
      if (!isPathInside(realRepoRoot, realDirectory)) {
        unsafe.push(`Coverage path resolves outside the repo: ${current.relativePath}`);
        continue;
      }
      if (visited.has(realDirectory)) continue;
      visited.add(realDirectory);
      let entries;
      try {
        entries = fs.readdirSync(current.absolutePath, { withFileTypes: true });
      } catch {
        unsafe.push(`Cannot read coverage path: ${current.relativePath}`);
        continue;
      }
      for (const entry of entries) {
        const childAbs = path.join(current.absolutePath, entry.name);
        const childRel = `${current.relativePath}/${entry.name}`;
        let childStat;
        try {
          if (entry.isSymbolicLink()) {
            const childReal = fs.realpathSync(childAbs);
            if (!isPathInside(realRepoRoot, childReal)) {
              unsafe.push(`Coverage symlink resolves outside the repo: ${childRel}`);
              continue;
            }
          }
          childStat = fs.statSync(childAbs);
        } catch {
          unsafe.push(`Broken coverage path: ${childRel}`);
          continue;
        }
        if (childStat.isDirectory()) {
          stack.push({ absolutePath: childAbs, relativePath: childRel });
        } else if (childStat.isFile()) {
          files.push(childRel);
        }
      }
    }
    return { missing: false, files, unsafe };
  }
  return { missing: false, files: [relPath], unsafe: [] };
}

/**
 * Build the covered-file set from manifest include and exclude entries.
 *
 * @param {string} packageAbsRoot - Absolute package root.
 * @param {{include: string[], exclude?: string[]}} sourceCoverage - Coverage configuration.
 * @returns {{covered: Set<string>, missingIncludes: string[]}} Coverage result.
 */
function buildCoverageSet(repoAbsRoot, packageAbsRoot, sourceCoverage) {
  const included = new Set();
  const missingIncludes = [];
  const unsafeEntries = [];
  for (const entry of sourceCoverage.include) {
    const { missing, files, unsafe } = expandCoverageEntry(repoAbsRoot, packageAbsRoot, entry);
    if (missing) missingIncludes.push(entry);
    unsafeEntries.push(...unsafe);
    for (const f of files) included.add(f);
  }
  const excluded = new Set();
  for (const entry of sourceCoverage.exclude || []) {
    const { files, unsafe } = expandCoverageEntry(repoAbsRoot, packageAbsRoot, entry);
    unsafeEntries.push(...unsafe);
    for (const f of files) excluded.add(f);
  }
  for (const f of excluded) included.delete(f);
  return { covered: included, missingIncludes, unsafeEntries };
}

/**
 * Check a source path's symlink stays inside the repository.
 *
 * @param {string} repoAbsRoot - Absolute repository root.
 * @param {string} packageAbsRoot - Absolute package root.
 * @param {string} relPath - Package-relative source path.
 * @param {object[]} findings - Finding accumulator.
 * @returns {void}
 */
function checkSymlinkSafety(repoAbsRoot, packageAbsRoot, relPath, findings) {
  const abs = path.join(packageAbsRoot, relPath);
  try {
    resolveContainedPath(packageAbsRoot, relPath, {
      mustExist: true,
      realBoundaryAbs: repoAbsRoot,
    });
    return true;
  } catch (err) {
    if (!(err instanceof UnsafePathError)) throw err;
    let finalStat;
    try {
      finalStat = fs.lstatSync(abs);
    } catch {
      return false; // SOURCE_MISSING reports ordinary absent paths.
    }
    let code = CODE.SYMLINK_ESCAPES_REPO;
    let message = err.message;
    try {
      if (finalStat.isSymbolicLink()) fs.realpathSync(abs);
    } catch {
      code = CODE.SYMLINK_BROKEN;
      message = `Broken symlink: ${relPath}`;
    }
    findings.push(
      finding(
        code,
        EXIT.INVALID_MANIFEST_OR_PATHS,
        message
      )
    );
    return false;
  }
}

/**
 * Check source coverage, source existence and mirror target collisions.
 *
 * @param {object} context - Check context and finding accumulator.
 * @returns {void}
 */
function checkCoverageAndMirrors({ repoAbsRoot, packageAbsRoot, manifest, findings }) {
  const { covered, missingIncludes, unsafeEntries } = buildCoverageSet(
    repoAbsRoot,
    packageAbsRoot,
    manifest.sourceCoverage
  );
  if (missingIncludes.length) {
    findings.push(
      finding(
        CODE.SOURCE_MISSING,
        EXIT.INVALID_MANIFEST_OR_PATHS,
        `sourceCoverage.include path(s) do not exist: ${missingIncludes.join(', ')}`
      )
    );
  }
  for (const unsafeEntry of unsafeEntries) {
    findings.push(
      finding(CODE.SYMLINK_ESCAPES_REPO, EXIT.INVALID_MANIFEST_OR_PATHS, unsafeEntry)
    );
  }

  const declaredSources = new Set(manifest.mirrors.map((m) => m.source));
  const unmapped = [...covered].filter((f) => !declaredSources.has(f));
  if (unmapped.length) {
    findings.push(
      finding(
        CODE.UNMAPPED_SOURCE,
        EXIT.INVALID_MANIFEST_OR_PATHS,
        `File(s) under declared coverage are not mapped in "mirrors": ${unmapped.sort().join(', ')}`
      )
    );
  }

  for (const mirror of manifest.mirrors) {
    const abs = path.join(packageAbsRoot, mirror.source);
    const isSafe = checkSymlinkSafety(
      repoAbsRoot,
      packageAbsRoot,
      mirror.source,
      findings
    );
    if (!fs.existsSync(abs)) {
      findings.push(
        finding(CODE.SOURCE_MISSING, EXIT.INVALID_MANIFEST_OR_PATHS, `Mirror source missing: ${mirror.source}`)
      );
      continue;
    }
    if (!isSafe) continue;
  }

  const targetCollisions = findCaseInsensitiveCollisions(manifest.mirrors.map((m) => m.target));
  for (const group of targetCollisions) {
    findings.push(
      finding(
        CODE.DUPLICATE_TARGET_CASE,
        EXIT.INVALID_MANIFEST_OR_PATHS,
        `Mirror targets collide case-insensitively: ${group.join(', ')}`
      )
    );
  }
}

/**
 * Check the knowledge directory inventory and mirror byte parity.
 *
 * @param {object} context - Check context and finding accumulator.
 * @returns {void}
 */
function checkKnowledgeInventory({ repoAbsRoot, packageAbsRoot, manifest, findings }) {
  let knowledgeAbsDir;
  try {
    knowledgeAbsDir = resolveContainedPath(packageAbsRoot, FIXED_KNOWLEDGE_ROOT, {
      mustExist: false,
    });
  } catch (err) {
    if (err instanceof UnsafePathError) {
      findings.push(finding(CODE.MANIFEST_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
      return;
    }
    throw err;
  }
  if (!fs.existsSync(knowledgeAbsDir)) {
    findings.push(
      finding(
        CODE.KNOWLEDGE_DIR_MISSING,
        EXIT.MECHANICAL_DRIFT,
        `Knowledge folder not yet materialized: ${FIXED_KNOWLEDGE_ROOT} (run sync --write once a manifest is authored)`
      )
    );
    return;
  }

  const actualFiles = fs.readdirSync(knowledgeAbsDir).filter((f) => f !== '.DS_Store');
  const declaredTargets = manifest.mirrors.map((m) => m.target);
  const actualSet = new Set(actualFiles);
  const declaredSet = new Set(declaredTargets);

  const unknown = actualFiles.filter((f) => !declaredSet.has(f));
  if (unknown.length) {
    findings.push(
      finding(
        CODE.UNKNOWN_KNOWLEDGE_FILE,
        EXIT.MECHANICAL_DRIFT,
        `Undeclared file(s) in knowledge/, never auto-deleted: ${unknown.sort().join(', ')}`
      )
    );
  }
  const missing = declaredTargets.filter((t) => !actualSet.has(t));
  if (missing.length) {
    findings.push(
      finding(
        CODE.MISSING_KNOWLEDGE_FILE,
        EXIT.MECHANICAL_DRIFT,
        `Declared mirror(s) not present in knowledge/: ${missing.sort().join(', ')}`
      )
    );
  }
  if (actualFiles.length !== manifest.expectedKnowledgeCount) {
    findings.push(
      finding(
        CODE.KNOWLEDGE_COUNT_MISMATCH,
        EXIT.MECHANICAL_DRIFT,
        `knowledge/ contains ${actualFiles.length} file(s), manifest expects ${manifest.expectedKnowledgeCount}`
      )
    );
  }

  for (const mirror of manifest.mirrors) {
    const sourceAbs = path.join(packageAbsRoot, mirror.source);
    const targetRel = `${FIXED_KNOWLEDGE_ROOT}/${mirror.target}`;
    if (!fs.existsSync(sourceAbs) || !actualSet.has(mirror.target)) continue; // already reported above
    let targetAbs;
    try {
      targetAbs = resolveContainedPath(packageAbsRoot, targetRel, { mustExist: true });
    } catch (err) {
      if (err instanceof UnsafePathError) {
        findings.push(finding(CODE.MANIFEST_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
        continue;
      }
      throw err;
    }
    const targetStat = fs.lstatSync(targetAbs);
    if (targetStat.isSymbolicLink() || !targetStat.isFile()) {
      findings.push(
        finding(
          CODE.MANIFEST_INVALID,
          EXIT.INVALID_MANIFEST_OR_PATHS,
          `Compiler-owned mirror target must be a regular file: ${targetRel}`
        )
      );
      continue;
    }
    let expectedBytes;
    try {
      expectedBytes = renderMirrorBytes({
        repoAbsRoot,
        packageAbsRoot,
        manifest,
        mirror,
      });
    } catch (err) {
      if (err instanceof MirrorRenderError) {
        findings.push(finding(CODE.MANIFEST_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
        continue;
      }
      if (err instanceof UnsafePathError) {
        findings.push(
          finding(CODE.SYMLINK_ESCAPES_REPO, EXIT.INVALID_MANIFEST_OR_PATHS, err.message)
        );
        continue;
      }
      throw err;
    }
    const targetHash = hashFile(targetAbs);
    if (sha256Hex(expectedBytes) !== targetHash.sha256) {
      findings.push(
        finding(
          CODE.MIRROR_BYTE_MISMATCH,
          EXIT.MECHANICAL_DRIFT,
          `Mirror does not match its compiler rendering: ${mirror.target} (from ${mirror.source})`
        )
      );
    }
  }
}

/** Read package-lock.json once so missing and invalid states stay distinct. */
function loadLock(packageAbsRoot, findings) {
  let lockAbs;
  try {
    lockAbs = resolveContainedPath(packageAbsRoot, LOCK_REL_PATH);
  } catch (err) {
    if (err instanceof UnsafePathError) {
      findings.push(finding(CODE.MANIFEST_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
      return { status: 'invalid', data: null };
    }
    throw err;
  }
  if (!fs.existsSync(lockAbs)) return { status: 'missing', data: null };
  try {
    return { status: 'ok', data: readJsonStrict(lockAbs) };
  } catch (err) {
    findings.push(
      finding(CODE.JSON_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, `Invalid ${LOCK_REL_PATH}: ${err.message}`)
    );
    return { status: 'invalid', data: null };
  }
}

function sameStringSet(actual, expected) {
  if (!Array.isArray(actual) || actual.length !== expected.length) return false;
  return new Set(actual).size === actual.length && expected.every((value) => actual.includes(value));
}

function checkLockConsistency({ packageAbsRoot, entry, manifest, lockState, findings }) {
  if (lockState.status === 'missing') {
    findings.push(
      finding(
        CODE.LOCK_MISSING,
        EXIT.MECHANICAL_DRIFT,
        `${LOCK_REL_PATH} is missing; run sync --system ${entry.id} --write to rebuild package state.`
      )
    );
    return;
  }
  if (lockState.status !== 'ok') return;
  const lock = lockState.data;
  const structureProblems = [];
  const expectedFiles = [
    entry.kernelPath,
    ...manifest.mirrors.map((mirror) => `${FIXED_KNOWLEDGE_ROOT}/${mirror.target}`),
  ];
  const fileRecords = Array.isArray(lock.files) ? lock.files : [];
  const filePaths = fileRecords.map((record) => record && record.path);
  const expectedRegions = (manifest.generatedRegions || []).flatMap((region) =>
    region.sections.map((section) => regionLockKey(region.target, section))
  );
  const regionRecords = Array.isArray(lock.regions) ? lock.regions : [];
  const regionKeys = regionRecords.map((record) =>
    record && regionLockKey(record.target, record.section)
  );
  const expectedDeletable = manifest.mirrors.map(
    (mirror) => `${FIXED_KNOWLEDGE_ROOT}/${mirror.target}`
  );

  if (lock.schemaVersion !== 1) structureProblems.push('schemaVersion must be 1');
  if (lock.systemId !== entry.id) structureProblems.push(`systemId must be ${entry.id}`);
  fileRecords.forEach((record, index) => {
    if (!record || typeof record !== 'object' || Array.isArray(record)) {
      structureProblems.push(`files[${index}] must be an object`);
      return;
    }
    if (typeof record.path !== 'string') structureProblems.push(`files[${index}].path must be a string`);
    if (!isSha256(record.sha256)) structureProblems.push(`files[${index}].sha256 must be SHA-256`);
    if (!isSha16(record.sha16)) structureProblems.push(`files[${index}].sha16 must be sha256-16`);
    if (!Number.isInteger(record.bytes) || record.bytes < 0) {
      structureProblems.push(`files[${index}].bytes must be a non-negative integer`);
    }
  });
  regionRecords.forEach((record, index) => {
    if (!record || typeof record !== 'object' || Array.isArray(record)) {
      structureProblems.push(`regions[${index}] must be an object`);
      return;
    }
    if (typeof record.target !== 'string') structureProblems.push(`regions[${index}].target must be a string`);
    if (typeof record.section !== 'string') structureProblems.push(`regions[${index}].section must be a string`);
    if (!isSha256(record.sha256)) structureProblems.push(`regions[${index}].sha256 must be SHA-256`);
  });
  if (!sameStringSet(filePaths, expectedFiles)) structureProblems.push('files inventory is incomplete or contains extras');
  if (!sameStringSet(regionKeys, expectedRegions)) structureProblems.push('regions inventory is incomplete or contains extras');
  if (!sameStringSet(lock.deletable, expectedDeletable)) structureProblems.push('deletable inventory does not match mirrors');
  if (typeof lock.generatedAt !== 'string' || Number.isNaN(Date.parse(lock.generatedAt))) {
    structureProblems.push('generatedAt must be an ISO-8601 timestamp');
  }
  if (structureProblems.length) {
    findings.push(
      finding(
        CODE.LOCK_STRUCTURE_MISMATCH,
        EXIT.MECHANICAL_DRIFT,
        `${LOCK_REL_PATH} structure mismatch: ${structureProblems.join('; ')}`
      )
    );
  }

  const expectedFileSet = new Set(expectedFiles);
  for (const record of fileRecords) {
    if (!record || !expectedFileSet.has(record.path)) continue;
    if (
      !isSha256(record.sha256) ||
      !isSha16(record.sha16) ||
      record.sha16 !== record.sha256.slice(0, 16)
    ) {
      findings.push(
        finding(
          CODE.HASH_PREFIX_MISMATCH,
          EXIT.MECHANICAL_DRIFT,
          `${LOCK_REL_PATH} sha16 is not the prefix of its own sha256 for ${record.path}`
        )
      );
      continue;
    }
    let abs;
    try {
      abs = resolveContainedPath(packageAbsRoot, record.path);
    } catch (err) {
      if (err instanceof UnsafePathError) {
        findings.push(
          finding(CODE.LOCK_STRUCTURE_MISMATCH, EXIT.MECHANICAL_DRIFT, err.message)
        );
        continue;
      }
      throw err;
    }
    if (!fs.existsSync(abs)) continue; // reported elsewhere as missing knowledge/kernel file
    const live = hashFile(abs);
    if (live.sha256 !== record.sha256 || live.bytes !== record.bytes) {
      findings.push(
        finding(
          CODE.LOCK_HASH_MISMATCH,
          EXIT.MECHANICAL_DRIFT,
          `${record.path} no longer matches the hash recorded in ${LOCK_REL_PATH}`
        )
      );
    }
  }

  const expectedRegionSet = new Set(expectedRegions);
  for (const record of regionRecords) {
    const key = record && regionLockKey(record.target, record.section);
    if (!record || !expectedRegionSet.has(key) || !isSha256(record.sha256)) continue;
    let targetAbs;
    try {
      targetAbs = resolveContainedPath(packageAbsRoot, record.target);
    } catch (err) {
      if (err instanceof UnsafePathError) {
        findings.push(
          finding(CODE.LOCK_STRUCTURE_MISMATCH, EXIT.MECHANICAL_DRIFT, err.message)
        );
        continue;
      }
      throw err;
    }
    if (!fs.existsSync(targetAbs)) continue;
    const body = extractRegion(fs.readFileSync(targetAbs, 'utf8'), record.section);
    if (body !== null && sha256Hex(body) !== record.sha256) {
      findings.push(
        finding(
          CODE.LOCK_HASH_MISMATCH,
          EXIT.MECHANICAL_DRIFT,
          `Generated region "${record.section}" in ${record.target} no longer matches ${LOCK_REL_PATH}`
        )
      );
    }
  }
}

/** Composite key for a lock's per-region record so target and section names
 * containing the same substring can never collide with each other. */
function regionLockKey(target, section) {
  return `${target} ${section}`;
}

/**
 * Compare every generated body with fresh renderer output from the live manifest.
 */
function checkGeneratedRegions({ packageAbsRoot, entry, manifest, findings }) {
  const kernelAbsPath = path.join(packageAbsRoot, entry.kernelPath);
  for (const region of manifest.generatedRegions || []) {
    let abs;
    try {
      abs = resolveContainedPath(packageAbsRoot, region.target);
    } catch (err) {
      if (err instanceof UnsafePathError) {
        findings.push(finding(CODE.MANIFEST_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
        continue;
      }
      throw err;
    }
    if (!fs.existsSync(abs)) {
      findings.push(
        finding(
          CODE.REGION_NOT_SCAFFOLDED,
          EXIT.MECHANICAL_DRIFT,
          `Generated-region target does not exist: ${region.target}`
        )
      );
      continue;
    }
    const targetStat = fs.lstatSync(abs);
    if (targetStat.isSymbolicLink() || !targetStat.isFile()) {
      findings.push(
        finding(
          CODE.MANIFEST_INVALID,
          EXIT.INVALID_MANIFEST_OR_PATHS,
          `Generated-region target must be a regular file: ${region.target}`
        )
      );
      continue;
    }
    const content = fs.readFileSync(abs, 'utf8');
    for (const section of region.sections) {
      const body = extractRegion(content, section);
      if (body === null) {
        findings.push(
          finding(
            CODE.REGION_NOT_SCAFFOLDED,
            EXIT.MECHANICAL_DRIFT,
            `Missing generated-region markers for "${section}" in ${region.target}`
          )
        );
        continue;
      }
      let expectedBody;
      try {
        expectedBody = renderSection(section, { manifest, packageAbsRoot, kernelAbsPath });
      } catch (err) {
        if (err instanceof MirrorRenderError) {
          findings.push(finding(CODE.MANIFEST_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
          continue;
        }
        throw err;
      }
      if (body !== expectedBody) {
        findings.push(
          finding(
            CODE.REGION_DRIFT,
            EXIT.MECHANICAL_DRIFT,
            `Generated region "${section}" in ${region.target} does not match current renderer output.`
          )
        );
      }
    }
  }
}

function scanFileForTokens(absPath, tokens) {
  if (BINARY_EXTENSIONS.has(path.extname(absPath).toLowerCase())) return [];
  let content;
  try {
    content = fs.readFileSync(absPath, 'utf8');
  } catch {
    return [];
  }
  const hits = [];
  const lines = content.split('\n');
  for (const token of tokens) {
    lines.forEach((line, idx) => {
      if (line.includes(token)) hits.push({ token, line: idx + 1 });
    });
  }
  return hits;
}

function isScanExcluded(manifest, relPath) {
  return (manifest.scanExcludes || []).some((ex) => relPath === ex || relPath.startsWith(`${ex}/`));
}

/** Tool-owned files that legitimately name a retired token without
 * "referencing" it the way live documentation would: the manifest itself
 * declares retiredNames verbatim (that is the whole point of the field),
 * and the generated state files record hashes/decisions, never prose. */
function toolOwnedPaths(entry) {
  return new Set([entry.manifestPath, JOURNAL_REL_PATH, LOCK_REL_PATH, KERNEL_REVIEW_REL_PATH, UPLOAD_RECEIPT_REL_PATH]);
}

function checkRetiredTokens({ packageAbsRoot, entry, manifest, findings }) {
  const tokens = manifest.retiredNames || [];
  if (!tokens.length) return;
  const owned = toolOwnedPaths(entry);
  const allFiles = walkFilesRecursive(packageAbsRoot);
  const hits = [];
  for (const relPath of allFiles) {
    if (owned.has(relPath) || isScanExcluded(manifest, relPath)) continue;
    const fileHits = scanFileForTokens(path.join(packageAbsRoot, relPath), tokens);
    for (const h of fileHits) hits.push(`${relPath}:${h.line} ("${h.token}")`);
  }
  if (hits.length) {
    findings.push(
      finding(
        CODE.RETIRED_TOKEN_FOUND,
        EXIT.MECHANICAL_DRIFT,
        `Retired token(s) found outside declared history: ${hits.join('; ')}`
      )
    );
  }
}

function checkJsonAndGraphTargets({ packageAbsRoot, entry, manifest, fleetRetiredNames, findings }) {
  const skillAbsRoot = path.join(packageAbsRoot, entry.skillRoot);
  for (const filename of ['description.json', 'graph-metadata.json']) {
    const abs = path.join(skillAbsRoot, filename);
    if (!fs.existsSync(abs)) {
      findings.push(
        finding(CODE.JSON_FILE_MISSING, EXIT.INVALID_MANIFEST_OR_PATHS, `Missing ${entry.skillRoot}/${filename}`)
      );
      continue;
    }
    let data;
    try {
      data = readJsonStrict(abs);
    } catch (err) {
      findings.push(
        finding(
          CODE.JSON_INVALID,
          EXIT.INVALID_MANIFEST_OR_PATHS,
          `${entry.skillRoot}/${filename} does not parse: ${err.message}`
        )
      );
      continue;
    }
    if (filename === 'graph-metadata.json' && fleetRetiredNames && fleetRetiredNames.size) {
      const targets = collectEdgeTargets(data);
      const retiredHits = targets.filter((t) => fleetRetiredNames.has(t.toLowerCase()));
      if (retiredHits.length) {
        findings.push(
          finding(
            CODE.GRAPH_TARGET_RETIRED,
            EXIT.MECHANICAL_DRIFT,
            `${entry.skillRoot}/graph-metadata.json references retired fleet name(s): ${retiredHits.join(', ')}`
          )
        );
      }
    }
  }
}

function collectEdgeTargets(graphMetadata) {
  const targets = [];
  const edges = (graphMetadata && graphMetadata.edges) || {};
  for (const list of Object.values(edges)) {
    if (!Array.isArray(list)) continue;
    for (const edge of list) {
      if (edge && typeof edge.target === 'string') targets.push(edge.target);
    }
  }
  return targets;
}

function checkKernelReview({ packageAbsRoot, entry, manifest, findings }) {
  let digest;
  try {
    digest = computeContractDigest(packageAbsRoot, manifest.contractInputs);
  } catch (err) {
    if (err instanceof ContractInputMissingError) {
      findings.push(finding(CODE.SOURCE_MISSING, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
      return;
    }
    throw err;
  }

  let reviewAbs;
  try {
    reviewAbs = resolveContainedPath(packageAbsRoot, KERNEL_REVIEW_REL_PATH);
  } catch (err) {
    if (err instanceof UnsafePathError) {
      findings.push(finding(CODE.MANIFEST_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
      return;
    }
    throw err;
  }
  if (!fs.existsSync(reviewAbs)) {
    findings.push(
      finding(
        CODE.KERNEL_REVIEW_REQUIRED,
        EXIT.KERNEL_REVIEW_REQUIRED,
        `No kernel review recorded (${KERNEL_REVIEW_REL_PATH} missing). ` +
          `Run: review-kernel --system ${entry.id} --reviewer <you> --reason <why>`
      )
    );
    return;
  }
  let review;
  try {
    review = readJsonStrict(reviewAbs);
  } catch (err) {
    findings.push(
      finding(
        CODE.JSON_INVALID,
        EXIT.INVALID_MANIFEST_OR_PATHS,
        `Invalid ${KERNEL_REVIEW_REL_PATH}: ${err.message}`
      )
    );
    return;
  }
  if (review.contractDigest !== digest) {
    findings.push(
      finding(
        CODE.KERNEL_REVIEW_REQUIRED,
        EXIT.KERNEL_REVIEW_REQUIRED,
        'Contract inputs changed since the recorded kernel review (digest mismatch). ' +
          `Run: review-kernel --system ${entry.id} --reviewer <you> --reason <why>`
      )
    );
    return;
  }
  let kernelAbs;
  try {
    kernelAbs = resolveContainedPath(packageAbsRoot, entry.kernelPath);
  } catch (err) {
    if (err instanceof UnsafePathError) {
      findings.push(finding(CODE.MANIFEST_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
      return;
    }
    throw err;
  }
  if (fs.existsSync(kernelAbs)) {
    const liveKernelHash = hashFile(kernelAbs).sha256;
    if (review.kernelSha256 && review.kernelSha256 !== liveKernelHash) {
      findings.push(
        finding(
          CODE.KERNEL_REVIEW_REQUIRED,
          EXIT.KERNEL_REVIEW_REQUIRED,
          `Custom Instructions.md changed since the recorded kernel review. ` +
            `Run: review-kernel --system ${entry.id} --reviewer <you> --reason <why>`
        )
      );
    }
  }
}

function runValidators({ packageAbsRoot, manifest, findings }) {
  for (const validator of manifest.validators || []) {
    let cwdAbs;
    try {
      cwdAbs = resolveContainedPath(packageAbsRoot, validator.cwd, {
        allowDot: true,
        mustExist: true,
      });
    } catch (err) {
      if (err instanceof UnsafePathError) {
        findings.push(finding(CODE.MANIFEST_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
        continue;
      }
      throw err;
    }
    const [cmd, ...args] = validator.command;
    const result = spawnSync(cmd, args, { cwd: cwdAbs, encoding: 'utf8' });
    if (result.error || result.status !== 0) {
      const tail = ((result.stdout || '') + (result.stderr || '')).trim().split('\n').slice(-5).join('\n');
      // A validator can exit non-zero with nothing on stdout/stderr and no
      // spawn error at all; falling back to `result.error` there produces
      // the literal string "undefined" instead of a usable explanation.
      const detail = tail || (result.error ? String(result.error) : `exited with status ${result.status}, no output`);
      findings.push(
        finding(
          CODE.VALIDATOR_FAILED,
          EXIT.VALIDATOR_FAILED,
          `Validator "${validator.name}" failed (${validator.command.join(' ')}): ${detail}`
        )
      );
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CORE LOGIC
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Collect declared retired names across all loadable systems.
 *
 * @param {string} repoRoot - Absolute repository root.
 * @param {{systems: object[]}} registry - Loaded system registry.
 * @returns {Set<string>} Lowercase retired names.
 */
function loadFleetRetiredNames(repoRoot, registry) {
  const names = new Set();
  for (const sys of registry.systems) {
    try {
      const packageAbsRoot = resolvePackageRoot(repoRoot, sys.packageRoot);
      const { data } = loadManifest(packageAbsRoot, sys.manifestPath, sys);
      for (const n of data.retiredNames || []) names.add(n.toLowerCase());
    } catch {
      // Advisory only - a system without a loadable manifest yet simply
      // contributes nothing to the fleet-wide retired-name corpus.
    }
  }
  return names;
}

/**
 * Run the full mechanical check suite for one registered system.
 *
 * @param {object} params - Check parameters.
 * @param {string} params.repoRoot - Absolute repository root.
 * @param {object} params.entry - Registry entry for the system.
 * @param {object} [params.options] - Optional check settings.
 * @param {boolean} [params.options.runValidators] - Whether package validators run.
 * @param {Set<string>} [params.options.fleetRetiredNames] - Fleet retired-name set.
 * @returns {{systemId: string, ok: boolean, exitCode: number, findings: object[]}} Check result.
 */
function checkSystem({ repoRoot, entry, options }) {
  const opts = options || {};
  const findings = [];
  let packageAbsRoot;
  try {
    packageAbsRoot = resolvePackageRoot(repoRoot, entry.packageRoot);
  } catch (err) {
    if (!(err instanceof UnsafePathError)) throw err;
    findings.push(
      finding(CODE.PACKAGE_ROOT_MISSING, EXIT.INVALID_MANIFEST_OR_PATHS, err.message)
    );
    return finalize(entry.id, findings);
  }

  const repoLockState = inspectRepoLock(repoRoot).state;
  if (repoLockState === 'held') {
    findings.push(
      finding(
        CODE.SYNC_IN_PROGRESS,
        EXIT.INTERRUPTED_TRANSACTION,
        'A fleet sync transaction is active; wait for the repo lock to clear before checking. ' +
          'Do not run recovery while the lock is held.'
      )
    );
    return finalize(entry.id, findings);
  }

  const journalAbs = path.join(packageAbsRoot, JOURNAL_REL_PATH);
  if (fs.existsSync(journalAbs)) {
    findings.push(
      finding(
        CODE.INTERRUPTED_TRANSACTION,
        EXIT.INTERRUPTED_TRANSACTION,
        `Interrupted sync transaction detected (${JOURNAL_REL_PATH} present). ` +
          `Run: sync --system ${entry.id} --recover`
      )
    );
    return finalize(entry.id, findings);
  }

  let manifest;
  try {
    manifest = loadManifest(packageAbsRoot, entry.manifestPath, entry).data;
  } catch (err) {
    if (err instanceof ManifestMissingError) {
      findings.push(
        finding(
          CODE.MANIFEST_MISSING,
          EXIT.INVALID_MANIFEST_OR_PATHS,
          `No manifest at ${entry.packageRoot}/${entry.manifestPath} yet - author claude-project.sync.json for this system.`
        )
      );
    } else if (err instanceof ManifestValidationError) {
      findings.push(finding(CODE.MANIFEST_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
    } else if (err instanceof JsonReadError || err instanceof JsonParseError) {
      findings.push(finding(CODE.MANIFEST_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
    } else {
      throw err;
    }
    return finalize(entry.id, findings);
  }

  const lock = loadLock(packageAbsRoot, findings);

  checkCoverageAndMirrors({ repoAbsRoot: repoRoot, packageAbsRoot, manifest, findings });
  checkKnowledgeInventory({ repoAbsRoot: repoRoot, packageAbsRoot, manifest, findings });
  checkLockConsistency({ packageAbsRoot, entry, manifest, lockState: lock, findings });
  checkGeneratedRegions({ packageAbsRoot, entry, manifest, findings });
  checkRetiredTokens({ packageAbsRoot, entry, manifest, findings });
  checkJsonAndGraphTargets({
    packageAbsRoot,
    entry,
    manifest,
    fleetRetiredNames: opts.fleetRetiredNames,
    findings,
  });
  checkKernelReview({ packageAbsRoot, entry, manifest, findings });
  if (opts.runValidators) {
    runValidators({ packageAbsRoot, manifest, findings });
  }

  return finalize(entry.id, findings);
}

function finalize(systemId, findings) {
  const exitCode = worstExitCode(findings.map((f) => f.exitCode));
  return { systemId, ok: exitCode === EXIT.CLEAN, exitCode, findings };
}

/**
 * Check live-deployment receipt state without reporting local mechanical drift.
 *
 * @param {object} params - Check parameters.
 * @param {string} params.repoRoot - Absolute repository root.
 * @param {object} params.entry - Registry entry for the system.
 * @returns {{systemId: string, ok: boolean, exitCode: number, findings: object[]}} Check result.
 */
function releaseCheckSystem({ repoRoot, entry }) {
  const findings = [];
  let packageAbsRoot;
  try {
    packageAbsRoot = resolvePackageRoot(repoRoot, entry.packageRoot);
  } catch (err) {
    if (!(err instanceof UnsafePathError)) throw err;
    findings.push(
      finding(CODE.PACKAGE_ROOT_MISSING, EXIT.INVALID_MANIFEST_OR_PATHS, err.message)
    );
    return finalize(entry.id, findings);
  }

  if (inspectRepoLock(repoRoot).state === 'held') {
    findings.push(
      finding(
        CODE.SYNC_IN_PROGRESS,
        EXIT.INTERRUPTED_TRANSACTION,
        'A fleet sync transaction is active; wait for the repo lock to clear before release checks.'
      )
    );
    return finalize(entry.id, findings);
  }

  let manifest;
  try {
    manifest = loadManifest(packageAbsRoot, entry.manifestPath, entry).data;
  } catch (err) {
    if (err instanceof ManifestMissingError) {
      findings.push(
        finding(CODE.MANIFEST_MISSING, EXIT.INVALID_MANIFEST_OR_PATHS, `No manifest for ${entry.id} yet.`)
      );
    } else if (err instanceof ManifestValidationError) {
      findings.push(finding(CODE.MANIFEST_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
    } else {
      throw err;
    }
    return finalize(entry.id, findings);
  }

  let receiptAbs;
  try {
    receiptAbs = resolveContainedPath(packageAbsRoot, UPLOAD_RECEIPT_REL_PATH);
  } catch (err) {
    if (err instanceof UnsafePathError) {
      findings.push(finding(CODE.MANIFEST_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
      return finalize(entry.id, findings);
    }
    throw err;
  }
  if (!fs.existsSync(receiptAbs)) {
    findings.push(
      finding(
        CODE.LIVE_RECEIPT_MISSING,
        EXIT.LIVE_RECEIPT_STALE,
        `No upload receipt recorded (${UPLOAD_RECEIPT_REL_PATH} missing). Run upload-plan, deploy, then record the upload.`
      )
    );
    return finalize(entry.id, findings);
  }

  let receipt;
  try {
    receipt = readJsonStrict(receiptAbs);
  } catch (err) {
    findings.push(
      finding(CODE.JSON_INVALID, EXIT.INVALID_MANIFEST_OR_PATHS, `Invalid ${UPLOAD_RECEIPT_REL_PATH}: ${err.message}`)
    );
    return finalize(entry.id, findings);
  }

  let currentDigest;
  try {
    const mirrorTargets = manifest.mirrors.map((m) => `${FIXED_KNOWLEDGE_ROOT}/${m.target}`);
    currentDigest = computePackageDigest(packageAbsRoot, entry.kernelPath, mirrorTargets);
  } catch (err) {
    findings.push(finding(CODE.SOURCE_MISSING, EXIT.INVALID_MANIFEST_OR_PATHS, err.message));
    return finalize(entry.id, findings);
  }

  if (receipt.packageDigest !== currentDigest) {
    findings.push(
      finding(
        CODE.LIVE_RECEIPT_STALE,
        EXIT.LIVE_RECEIPT_STALE,
        'Package changed since the last recorded upload (package digest mismatch).'
      )
    );
  } else if (receipt.smokeResult !== 'pass') {
    findings.push(
      finding(
        CODE.LIVE_RECEIPT_STALE,
        EXIT.LIVE_RECEIPT_STALE,
        `Last recorded smoke result was "${receipt.smokeResult}", not "pass".`
      )
    );
  }

  return finalize(entry.id, findings);
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  CODE,
  JOURNAL_REL_PATH,
  LOCK_REL_PATH,
  KERNEL_REVIEW_REL_PATH,
  UPLOAD_RECEIPT_REL_PATH,
  checkSystem,
  releaseCheckSystem,
  loadFleetRetiredNames,
  buildCoverageSet,
  expandCoverageEntry,
};

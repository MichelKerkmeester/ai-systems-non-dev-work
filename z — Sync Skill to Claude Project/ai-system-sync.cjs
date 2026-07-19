#!/usr/bin/env node
// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ AI System Sync Compiler CLI                                              ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS/REQUIRES
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('node:fs');
const path = require('node:path');

const LIB_DIR = path.join(__dirname, 'lib');
const req = (name) => require(path.join(LIB_DIR, name));

const { resolveRepoRoot, RepoRootError } = req('repo-root.cjs');
const { EXIT, worstExitCode } = req('exit-codes.cjs');
const { loadRegistry, findSystem, RegistryValidationError } = req('registry.cjs');
const {
  loadManifest,
  ManifestMissingError,
  ManifestValidationError,
  FIXED_KNOWLEDGE_ROOT,
} = req('manifest.cjs');
const mech = req('mechanical-checks.cjs');
const tx = req('transaction.cjs');
const { computeContractDigest, ContractInputMissingError } = req('contract-digest.cjs');
const { hashFile, sha256Hex } = req('hashing.cjs');
const { renderLockContentIfChanged } = req('lockfile.cjs');
const { MirrorRenderError, renderMirrorBytes } = req('mirrors.cjs');
const {
  UnsafePathError,
  resolveContainedPath,
  resolvePackageRoot,
} = req('path-safety.cjs');
const { extractRegion, replaceRegion, RegionNotFoundError } = req('regions.cjs');
const { renderSection, UnknownSectionError } = req('render.cjs');
const git = req('git-utils.cjs');
const { readJsonStrict, sortStable } = req('util.cjs');
const { KERNEL_REVIEW_REL_PATH, LOCK_REL_PATH } = req('paths.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

// Include the tool directory so staged changes to shared checks cover the fleet.
const TOOL_ROOT_FOLDER = path.basename(__dirname);

// ─────────────────────────────────────────────────────────────────────────────
// 3. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Error raised when a generated sync operation cannot be rendered. */
class SyncRenderError extends Error {}

/**
 * Parse CLI flags without changing their supplied values.
 *
 * @param {string[]} argv - Arguments after the command name.
 * @returns {object} Parsed flags and positional arguments.
 */
function parseArgs(argv) {
  const flags = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      flags.help = true;
      continue;
    }
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        flags[key] = next;
        i += 1;
      } else {
        flags[key] = true;
      }
    } else {
      flags._.push(arg);
    }
  }
  return flags;
}

/**
 * Resolve command targets from system, fleet or staged flags.
 *
 * @param {object} flags - Parsed CLI flags.
 * @param {{registry: object}} ctx - CLI context.
 * @param {{allowStaged?: boolean}} [options] - Target-resolution options.
 * @returns {{entries?: object[], staged?: boolean, error?: string, exitCode?: number}}
 *   Target result.
 */
function resolveTargetSystems(flags, ctx, { allowStaged } = {}) {
  if (flags.system) {
    const entry = findSystem(ctx.registry, flags.system);
    if (!entry) {
      return {
        error: `unknown system id "${flags.system}"`,
        exitCode: EXIT.INVALID_MANIFEST_OR_PATHS,
      };
    }
    return { entries: [entry] };
  }
  if (flags.all) {
    return { entries: sortStable(ctx.registry.systems, (s) => s.id) };
  }
  if (allowStaged && flags.staged) {
    return { staged: true };
  }
  return {
    error: 'requires --system <id> or --all' + (allowStaged ? ' (or --staged)' : ''),
    exitCode: EXIT.USAGE,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CORE LOGIC
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Dispatch one CLI invocation to the selected command.
 *
 * @param {string[]} argv - Command-line arguments.
 * @returns {number} Process exit code.
 */
function main(argv) {
  if (
    argv.some((argument) => argument === '--help' || argument === '-h') ||
    argv.length === 0
  ) {
    printHelp();
    return EXIT.CLEAN;
  }

  const [command, ...rest] = argv;
  const flags = parseArgs(rest);

  let repoRoot;
  let registry;
  try {
    repoRoot = resolveRepoRoot({});
    registry = loadRegistry();
  } catch (err) {
    if (err instanceof RepoRootError) {
      printLine(`error: ${err.message}`);
      return EXIT.USAGE;
    }
    if (err instanceof RegistryValidationError) {
      printLine(`error: ${err.message}`);
      return EXIT.INVALID_MANIFEST_OR_PATHS;
    }
    throw err;
  }

  const ctx = { repoRoot, registry };

  switch (command) {
    case 'plan':
      return cmdPlan(flags, ctx);
    case 'check':
      return cmdCheck(flags, ctx);
    case 'sync':
      return cmdSync(flags, ctx);
    case 'review-kernel':
      return cmdReviewKernel(flags, ctx);
    case 'upload-plan':
      return cmdUploadPlan(flags, ctx);
    case 'release-check':
      return cmdReleaseCheck(flags, ctx);
    default:
      printLine(`error: unknown command "${command}"`);
      printHelp();
      return EXIT.USAGE;
  }
}

function cmdPlan(flags, ctx) {
  const target = resolveTargetSystems(flags, ctx);
  if (target.error) {
    printLine(`error: plan ${target.error}`);
    return target.exitCode;
  }
  let sawUnknown = false;
  for (const entry of target.entries) {
    printLine(`== ${entry.id} (${entry.packageRoot}) ==`);
    let packageAbsRoot;
    try {
      packageAbsRoot = resolvePackageRoot(ctx.repoRoot, entry.packageRoot);
    } catch (err) {
      if (!(err instanceof UnsafePathError)) throw err;
      printLine(`  package root invalid: ${err.message}`);
      sawUnknown = true;
      continue;
    }
    try {
      const { data: manifest } = loadManifest(packageAbsRoot, entry.manifestPath, entry);
      printLine(`  manifest: ${entry.manifestPath}`);
      printLine(
        `  kernel: v${manifest.kernel.version} aligned to skill ` +
          `v${manifest.kernel.alignedSkillVersion}`
      );
      printLine(
        `  mirrors declared: ${manifest.mirrors.length} ` +
          `(expectedKnowledgeCount ${manifest.expectedKnowledgeCount})`
      );
      printLine(`  contractInputs: ${manifest.contractInputs.length}`);
      printLine(`  validators declared: ${(manifest.validators || []).length}`);
      printLine(`  retiredNames declared: ${(manifest.retiredNames || []).length}`);
    } catch (err) {
      if (err instanceof ManifestMissingError) {
        printLine(
          `  no manifest yet at ${entry.manifestPath} - ` +
            'nothing to plan until claude-project.sync.json is authored.'
        );
      } else if (err instanceof ManifestValidationError) {
        printLine(`  manifest invalid:\n    ${err.message.split('\n').join('\n    ')}`);
        sawUnknown = true;
      } else {
        throw err;
      }
    }
  }
  return sawUnknown ? EXIT.INVALID_MANIFEST_OR_PATHS : EXIT.CLEAN;
}

function cmdCheck(flags, ctx) {
  const runValidators = !!flags['run-validators'];

  if (flags.staged) {
    return cmdCheckStaged(flags, ctx, runValidators);
  }

  const target = resolveTargetSystems(flags, ctx, { allowStaged: true });
  if (target.error) {
    printLine(`error: check ${target.error}`);
    return target.exitCode;
  }

  const fleetRetiredNames = mech.loadFleetRetiredNames(ctx.repoRoot, ctx.registry);
  const results = target.entries.map((entry) =>
    mech.checkSystem({
      repoRoot: ctx.repoRoot,
      entry,
      options: { runValidators, fleetRetiredNames },
    })
  );
  for (const result of results) {
    printCheckResult(result);
  }
  return worstExitCode(results.map((result) => result.exitCode));
}

function cmdCheckStaged(flags, ctx, runValidators) {
  if (!git.isGitRepo(ctx.repoRoot)) {
    printLine('error: check --staged requires a git repository at the repo root');
    return EXIT.INVALID_MANIFEST_OR_PATHS;
  }
  const staged = git.stagedFiles(ctx.repoRoot);
  const infraTouched = staged.some(
    (filePath) => filePath === TOOL_ROOT_FOLDER || filePath.startsWith(`${TOOL_ROOT_FOLDER}/`)
  );
  const affected = infraTouched
    ? sortStable(ctx.registry.systems, (system) => system.id)
    : sortStable(
        ctx.registry.systems.filter((system) =>
          staged.some(
            (filePath) =>
              filePath === system.packageRoot || filePath.startsWith(`${system.packageRoot}/`)
          )
        ),
        (system) => system.id
      );

  if (!affected.length) {
    printLine(
      'check --staged: no staged changes touch a registered package, ' +
        'the registry, or the CLI.'
    );
    return EXIT.CLEAN;
  }

  // Validate index content rather than a potentially different working tree.
  // Confirm affected packages agree with the index before checking them.
  // Refuse when they differ instead of silently checking the wrong bytes.
  const unstaged = git.run(['diff', '--name-only'], ctx.repoRoot);
  const unstagedFiles =
    unstaged.ok && unstaged.stdout ? unstaged.stdout.split('\n').filter(Boolean) : [];
  const divergent = affected.filter((entry) =>
    unstagedFiles.some(
      (filePath) =>
        filePath === entry.packageRoot || filePath.startsWith(`${entry.packageRoot}/`)
    )
  );
  if (divergent.length) {
    printLine(
      'error: check --staged cannot validate index content for ' +
        `${divergent.map((entry) => entry.id).join(', ')}: ` +
          'the working tree has unstaged changes in scope. ' +
        'Stage or discard those changes, or run check --system/--all against ' +
          'the working tree instead.'
    );
    return EXIT.INVALID_MANIFEST_OR_PATHS;
  }

  const fleetRetiredNames = mech.loadFleetRetiredNames(ctx.repoRoot, ctx.registry);
  const results = affected.map((entry) =>
    mech.checkSystem({
      repoRoot: ctx.repoRoot,
      entry,
      options: { runValidators, fleetRetiredNames },
    })
  );
  for (const result of results) printCheckResult(result);
  return worstExitCode(results.map((result) => result.exitCode));
}

function printCheckResult(result) {
  printLine(`== ${result.systemId}: ${result.ok ? 'clean' : `exit ${result.exitCode}`} ==`);
  for (const finding of result.findings) {
    printLine(`  [${finding.code}] ${finding.message}`);
  }
}

function cmdSync(flags, ctx) {
  if (!flags.system) {
    printLine('error: sync requires --system <id>');
    return EXIT.USAGE;
  }
  const entry = findSystem(ctx.registry, flags.system);
  if (!entry) {
    printLine(`error: unknown system id "${flags.system}"`);
    return EXIT.INVALID_MANIFEST_OR_PATHS;
  }
  if (!flags.write && !flags.recover) {
    printLine('sync only writes with --write. Pass --recover only for an interrupted transaction.');
    return EXIT.INVALID_MANIFEST_OR_PATHS;
  }
  let packageAbsRoot;
  try {
    packageAbsRoot = resolvePackageRoot(ctx.repoRoot, entry.packageRoot);
  } catch (err) {
    if (!(err instanceof UnsafePathError)) throw err;
    printLine(`error: cannot sync ${entry.id}: ${err.message}`);
    return EXIT.INVALID_MANIFEST_OR_PATHS;
  }

  if (flags.recover) {
    const interruptedJournal = tx.detectInterruptedJournal(packageAbsRoot);
    if (!interruptedJournal) {
      const result = tx.recoverInterruptedJournal(ctx.repoRoot, packageAbsRoot);
      if (!result.recovered) {
        printLine(`sync --recover: no interrupted transaction found for ${entry.id}.`);
        return EXIT.CLEAN;
      }
    }
    let recoveryManifest;
    try {
      recoveryManifest = loadManifest(packageAbsRoot, entry.manifestPath, entry).data;
    } catch (err) {
      if (err instanceof ManifestMissingError || err instanceof ManifestValidationError) {
        printLine(`error: recovery refused for ${entry.id}: ${err.message}`);
        return EXIT.INVALID_MANIFEST_OR_PATHS;
      }
      throw err;
    }
    try {
      const allowedTargets = buildRecoveryAllowedTargets(
        packageAbsRoot,
        recoveryManifest
      );
      const result = tx.recoverInterruptedJournal(ctx.repoRoot, packageAbsRoot, {
        allowedTargets,
      });
      if (result.action === 'finalized') {
        printLine(
          `sync --recover: finalized committed transaction with ` +
            `${result.totalOperations} operation(s) for ${entry.id}.`
        );
        return EXIT.CLEAN;
      }
      printLine(
        `sync --recover: rolled back ${result.rolledBack}/${result.totalOperations} ` +
          `operation(s) for ${entry.id}.`
      );
      return EXIT.CLEAN;
    } catch (err) {
      if (err instanceof tx.RepoLockHeldError || err instanceof tx.CorruptJournalError) {
        printLine(`error: recovery refused for ${entry.id}: ${err.message}`);
        return EXIT.INTERRUPTED_TRANSACTION;
      }
      throw err;
    }
  }

  const interrupted = tx.detectInterruptedJournal(packageAbsRoot);
  if (interrupted) {
    const lockState = tx.inspectRepoLock(ctx.repoRoot).state;
    const action = lockState === 'held'
      ? 'A sync transaction is still active; wait for it to finish and do not run recovery.'
      : `Run: sync --system ${entry.id} --recover`;
    printLine(`error: a sync journal is present for ${entry.id}. ${action}`);
    return EXIT.INTERRUPTED_TRANSACTION;
  }

  // Resolve manifest state once before staging compiler-owned content.
  let manifestError = null;
  try {
    loadManifest(packageAbsRoot, entry.manifestPath, entry);
  } catch (err) {
    if (err instanceof ManifestMissingError || err instanceof ManifestValidationError) {
      manifestError = err;
    } else {
      throw err;
    }
  }

  // Reject a missing or invalid manifest before staging undeclared content.
  if (manifestError) {
    printLine(`error: cannot sync ${entry.id}: ${manifestError.message}`);
    return EXIT.INVALID_MANIFEST_OR_PATHS;
  }

  const manifest = loadManifest(packageAbsRoot, entry.manifestPath, entry).data;

  let plan;
  try {
    plan = buildSyncOperations({ repoRoot: ctx.repoRoot, packageAbsRoot, entry, manifest });
  } catch (err) {
    if (
      err instanceof SyncRenderError ||
      err instanceof RegionNotFoundError ||
      err instanceof UnknownSectionError ||
      err instanceof MirrorRenderError ||
      err instanceof UnsafePathError
    ) {
      printLine(`error: cannot sync ${entry.id}: ${err.message}`);
      return EXIT.INVALID_MANIFEST_OR_PATHS;
    }
    throw err;
  }

  try {
    const result = tx.runSyncTransaction({
      repoRoot: ctx.repoRoot,
      packageAbsRoot,
      operations: plan.operations,
      rehashSources: plan.rehashSources,
      renderLockFileLast: () =>
        renderLockContentIfChanged({
          packageAbsRoot,
          entry,
          manifest,
          regionShas: plan.regionShas,
        }),
    });
    if (result.applied === 0) {
      printLine(`sync: ${entry.id} already up to date (0 change(s)).`);
      return EXIT.CLEAN;
    }
    printLine(`sync: applied ${result.applied} change(s) for ${entry.id}.`);
    return EXIT.CLEAN;
  } catch (err) {
    if (
      err instanceof tx.InterruptedTransactionError ||
      err instanceof tx.RepoLockHeldError ||
      err instanceof tx.CorruptJournalError
    ) {
      printLine(`error: ${err.message}`);
      return EXIT.INTERRUPTED_TRANSACTION;
    }
    printLine(`error: sync failed for ${entry.id}: ${err.message}`);
    return EXIT.INVALID_MANIFEST_OR_PATHS;
  }
}

function buildRecoveryAllowedTargets(packageAbsRoot, manifest) {
  const allowedTargets = new Set([
    LOCK_REL_PATH,
    ...manifest.mirrors.map(
      (mirror) => `${FIXED_KNOWLEDGE_ROOT}/${mirror.target}`
    ),
    ...(manifest.generatedRegions || []).map((region) => region.target),
  ]);
  const lockAbs = resolveContainedPath(packageAbsRoot, LOCK_REL_PATH);
  if (!fs.existsSync(lockAbs)) return allowedTargets;
  try {
    const previousLock = readJsonStrict(lockAbs);
    for (const target of previousLock.deletable || []) {
      if (
        typeof target === 'string' &&
        target.startsWith(`${FIXED_KNOWLEDGE_ROOT}/`)
      ) {
        resolveContainedPath(packageAbsRoot, target);
        allowedTargets.add(target);
      }
    }
  } catch {
    // Current manifest targets remain sufficient when prior lock state is unreadable.
  }
  return allowedTargets;
}

/**
 * Turn a validated manifest into the exact set of file writes `sync --write`
 * needs to apply: every mirror re-derived from its live, dereferenced source,
 * and every declared generated-region body re-rendered into its target file.
 * An operation is included only when the computed bytes differ from what is
 * already on disk (or the target is missing), so a second run against
 * unchanged sources produces zero operations instead of rewriting identical
 * bytes - the idempotence a compiler-style sync depends on to ever be
 * trusted as a no-op check.
 */
function buildSyncOperations({ repoRoot, packageAbsRoot, entry, manifest }) {
  const operations = [];
  const preconditions = new Map();
  const regionShas = [];

  const snapshot = (relativePath, absolutePath, allowRepoBoundary) => {
    if (preconditions.has(relativePath)) return;
    const expectedExists = fs.existsSync(absolutePath);
    preconditions.set(relativePath, {
      path: relativePath,
      expectedExists,
      expectedSha256: expectedExists ? hashFile(absolutePath).sha256 : null,
      allowRepoBoundary: !!allowRepoBoundary,
    });
  };

  const manifestAbs = resolveContainedPath(packageAbsRoot, entry.manifestPath, {
    mustExist: true,
  });
  snapshot(entry.manifestPath, manifestAbs, false);
  const kernelAbsPath = resolveContainedPath(packageAbsRoot, entry.kernelPath, {
    mustExist: true,
  });
  snapshot(entry.kernelPath, kernelAbsPath, false);
  const lockAbsPath = resolveContainedPath(packageAbsRoot, LOCK_REL_PATH);
  snapshot(LOCK_REL_PATH, lockAbsPath, false);

  for (const mirror of manifest.mirrors) {
    const sourceAbs = resolveContainedPath(packageAbsRoot, mirror.source, {
      mustExist: true,
      realBoundaryAbs: repoRoot,
    });
    snapshot(mirror.source, sourceAbs, true);
    const renderedBytes = renderMirrorBytes({
      repoAbsRoot: repoRoot,
      packageAbsRoot,
      manifest,
      mirror,
    });
    const renderedSha256 = sha256Hex(renderedBytes);
    const targetRel = `${FIXED_KNOWLEDGE_ROOT}/${mirror.target}`;
    const targetAbs = resolveContainedPath(packageAbsRoot, targetRel);
    snapshot(targetRel, targetAbs, false);
    if (fs.existsSync(targetAbs)) {
      const targetStat = fs.lstatSync(targetAbs);
      if (targetStat.isSymbolicLink() || !targetStat.isFile()) {
        throw new SyncRenderError(`Compiler-owned mirror target must be a regular file: ${targetRel}`);
      }
    }
    const alreadyCurrent =
      fs.existsSync(targetAbs) && hashFile(targetAbs).sha256 === renderedSha256;
    if (!alreadyCurrent) {
      operations.push({ type: 'write', target: targetRel, content: renderedBytes });
    }
  }

  for (const region of manifest.generatedRegions || []) {
    const targetAbs = resolveContainedPath(packageAbsRoot, region.target, { mustExist: true });
    if (!fs.existsSync(targetAbs)) {
      throw new SyncRenderError(`Generated-region target does not exist: ${region.target}`);
    }
    const targetStat = fs.lstatSync(targetAbs);
    if (targetStat.isSymbolicLink() || !targetStat.isFile()) {
      throw new SyncRenderError(
        `Generated-region target must be a regular file: ${region.target}`
      );
    }
    snapshot(region.target, targetAbs, false);
    const originalContent = fs.readFileSync(targetAbs, 'utf8');
    let content = originalContent;
    for (const section of region.sections) {
      if (extractRegion(content, section) === null) {
        throw new RegionNotFoundError(
          `No "${section}" generated region markers found in ${region.target}. ` +
            'Add the markers first.'
        );
      }
      const body = renderSection(section, { manifest, packageAbsRoot, kernelAbsPath });
      content = replaceRegion(content, section, body);
      regionShas.push({ target: region.target, section, sha256: sha256Hex(body) });
    }
    if (content !== originalContent) {
      operations.push({
        type: 'write',
        target: region.target,
        content: Buffer.from(content, 'utf8'),
      });
    }
  }

  return { operations, rehashSources: [...preconditions.values()], regionShas };
}

function cmdReviewKernel(flags, ctx) {
  const missing = ['system', 'reviewer', 'reason'].filter((k) => !flags[k]);
  if (missing.length) {
    printLine(`error: review-kernel requires --${missing.join(', --')}`);
    return EXIT.USAGE;
  }
  const entry = findSystem(ctx.registry, flags.system);
  if (!entry) {
    printLine(`error: unknown system id "${flags.system}"`);
    return EXIT.INVALID_MANIFEST_OR_PATHS;
  }
  let packageAbsRoot;
  try {
    packageAbsRoot = resolvePackageRoot(ctx.repoRoot, entry.packageRoot);
  } catch (err) {
    if (!(err instanceof UnsafePathError)) throw err;
    printLine(`error: cannot review-kernel for ${entry.id}: ${err.message}`);
    return EXIT.INVALID_MANIFEST_OR_PATHS;
  }
  let manifest;
  try {
    manifest = loadManifest(packageAbsRoot, entry.manifestPath, entry).data;
  } catch (err) {
    if (err instanceof ManifestMissingError || err instanceof ManifestValidationError) {
      printLine(`error: cannot review-kernel for ${entry.id}: ${err.message}`);
      return EXIT.INVALID_MANIFEST_OR_PATHS;
    }
    throw err;
  }

  let digest;
  try {
    digest = computeContractDigest(packageAbsRoot, manifest.contractInputs);
  } catch (err) {
    if (err instanceof ContractInputMissingError) {
      printLine(`error: cannot compute contract digest for ${entry.id}: ${err.message}`);
      return EXIT.INVALID_MANIFEST_OR_PATHS;
    }
    throw err;
  }

  let kernelAbs;
  try {
    kernelAbs = resolveContainedPath(packageAbsRoot, entry.kernelPath, { mustExist: true });
  } catch (err) {
    if (err instanceof UnsafePathError) {
      printLine(`error: kernel path invalid: ${err.message}`);
      return EXIT.INVALID_MANIFEST_OR_PATHS;
    }
    throw err;
  }
  if (!fs.existsSync(kernelAbs)) {
    printLine(`error: kernel file not found: ${entry.kernelPath}`);
    return EXIT.INVALID_MANIFEST_OR_PATHS;
  }
  const kernelSha256 = hashFile(kernelAbs).sha256;

  const timestamp =
    git.lastCommitTimestamp(ctx.repoRoot, path.join(entry.packageRoot, entry.kernelPath)) ||
    fs.statSync(kernelAbs).mtime.toISOString();

  const record = {
    schemaVersion: 1,
    systemId: entry.id,
    reviewer: flags.reviewer,
    reason: flags.reason,
    decision: typeof flags.decision === 'string' ? flags.decision : null,
    reviewedAt: timestamp,
    contractDigest: digest,
    kernelSha256,
    kernelVersion: manifest.kernel.version,
    alignedSkillVersion: manifest.kernel.alignedSkillVersion,
  };

  let reviewAbs;
  try {
    reviewAbs = resolveContainedPath(packageAbsRoot, KERNEL_REVIEW_REL_PATH);
  } catch (err) {
    if (err instanceof UnsafePathError) {
      printLine(`error: review path invalid: ${err.message}`);
      return EXIT.INVALID_MANIFEST_OR_PATHS;
    }
    throw err;
  }
  fs.mkdirSync(path.dirname(reviewAbs), { recursive: true });
  fs.writeFileSync(reviewAbs, `${JSON.stringify(record, null, 2)}\n`);
  printLine(
    `review-kernel: recorded for ${entry.id} at ${KERNEL_REVIEW_REL_PATH} ` +
      `(digest ${digest.slice(0, 16)}...)`
  );
  return EXIT.CLEAN;
}

function cmdUploadPlan(flags, ctx) {
  const target = resolveTargetSystems(flags, ctx);
  if (target.error) {
    printLine(`error: upload-plan ${target.error}`);
    return target.exitCode;
  }
  let sawInvalid = false;
  for (const entry of target.entries) {
    printLine(`== ${entry.id} upload plan ==`);
    const lexicalPackageRoot = path.join(ctx.repoRoot, entry.packageRoot);
    if (!fs.existsSync(lexicalPackageRoot)) {
      printLine(
        '  no manifest yet - cannot produce an upload plan until ' +
          'claude-project.sync.json is authored.'
      );
      continue;
    }
    let packageAbsRoot;
    try {
      packageAbsRoot = resolvePackageRoot(ctx.repoRoot, entry.packageRoot);
    } catch (err) {
      if (!(err instanceof UnsafePathError)) throw err;
      printLine(`  package root invalid: ${err.message}`);
      sawInvalid = true;
      continue;
    }
    try {
      const { data: manifest } = loadManifest(packageAbsRoot, entry.manifestPath, entry);
      printLine(`  1. Paste ${entry.kernelPath} into the Project custom instructions field.`);
      printLine(`  2. Remove superseded Project Knowledge uploads.`);
       printLine(
         `  3. Upload all ${manifest.expectedKnowledgeCount} file(s) ` +
           'in claude project/knowledge/:'
       );
       for (const mirror of sortStable(manifest.mirrors, (item) => item.target)) {
        printLine(`     - ${mirror.target}`);
      }
      printLine('  4. Run the smoke matrix, then record the result with the upload receipt.');
    } catch (err) {
      if (err instanceof ManifestMissingError) {
        printLine(
          '  no manifest yet - cannot produce an upload plan until ' +
            'claude-project.sync.json is authored.'
        );
      } else if (err instanceof ManifestValidationError) {
        printLine(`  manifest invalid:\n    ${err.message.split('\n').join('\n    ')}`);
        sawInvalid = true;
      } else {
        throw err;
      }
    }
  }
  return sawInvalid ? EXIT.INVALID_MANIFEST_OR_PATHS : EXIT.CLEAN;
}

function cmdReleaseCheck(flags, ctx) {
  if (!flags.all) {
    printLine('error: release-check requires --all');
    return EXIT.USAGE;
  }
  const entries = sortStable(ctx.registry.systems, (system) => system.id);
  const results = entries.map((entry) =>
    mech.releaseCheckSystem({ repoRoot: ctx.repoRoot, entry })
  );
  for (const result of results) printCheckResult(result);
  return worstExitCode(results.map((result) => result.exitCode));
}

function printLine(text) {
  process.stdout.write(`${text}\n`);
}

function printHelp() {
  const decisionOption = '[--decision <updated|no-change>]';
  printLine(`ai-system-sync - Barter fleet packaging compiler (report-only build)

Usage:
  ai-system-sync plan [--system <id> | --all]
  ai-system-sync check [--system <id> | --all | --staged] [--run-validators]
  ai-system-sync sync --system <id> [--write] [--recover]
  ai-system-sync review-kernel --system <id> --reviewer <name> --reason <text> ${decisionOption}
  ai-system-sync upload-plan [--system <id> | --all]
  ai-system-sync release-check --all

Exit codes (0-6 report fleet state; 64 reports a bad invocation, never a state):
  0  clean                              4  package validator failed
  1  mechanical drift                   5  interrupted transaction / recovery required
  2  invalid manifest, path, or symlink 6  live deployment receipt stale or absent
  3  kernel review required             64 usage error (unknown command, missing flag)

check never reports live currency; only release-check reads upload receipts.`);
}

if (require.main === module) {
  // Treat a closed output pipe as a clean exit instead of an uncaught EPIPE
  // Stack trace when a reader stops consuming output early.
  process.stdout.on('error', (err) => {
    if (err && err.code === 'EPIPE') process.exit(EXIT.CLEAN);
    throw err;
  });
  process.exitCode = main(process.argv.slice(2));
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = { main, parseArgs };

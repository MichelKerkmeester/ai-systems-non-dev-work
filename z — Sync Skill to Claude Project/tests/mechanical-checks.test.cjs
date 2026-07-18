// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ MECHANICAL CHECKS TESTS                                                  ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { checkSystem, CODE } = require('../lib/mechanical-checks.cjs');
const { EXIT } = require('../lib/exit-codes.cjs');
const { sha256Hex } = require('../lib/hashing.cjs');
const { mkTempRepo, buildCleanPackage, writeFile, writeJson } = require('./helpers.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getFindingCodes(result) {
  return result.findings.map((finding) => finding.code);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. TESTS
// ─────────────────────────────────────────────────────────────────────────────

test('exit 0: a fully consistent fixture package checks clean', () => {
  const repoRoot = mkTempRepo();
  const { entry } = buildCleanPackage(repoRoot);
  const result = checkSystem({ repoRoot, entry });
  assert.equal(result.exitCode, EXIT.CLEAN, JSON.stringify(result.findings));
  assert.equal(result.ok, true);
});

test(
  'exit 1: mutating a mirror after the fact is reported as mechanical drift, not silently accepted',
  () => {
    const repoRoot = mkTempRepo();
    const { entry, mirrorTarget } = buildCleanPackage(repoRoot);
    writeFile(
      repoRoot,
      path.join(entry.packageRoot, 'claude project/knowledge', mirrorTarget),
      'tampered bytes\n'
    );

    const result = checkSystem({ repoRoot, entry });
    assert.equal(result.exitCode, EXIT.MECHANICAL_DRIFT);
    assert.ok(getFindingCodes(result).includes(CODE.MIRROR_BYTE_MISMATCH));
  }
);

test('exit 2: a missing manifest reports exactly one clear finding and does not crash', () => {
  const repoRoot = mkTempRepo();
  const entry = {
    id: 'ghost',
    packageRoot: 'Ghost System',
    skillRoot: 'sk-ghost',
    kernelPath: 'claude project/Custom Instructions.md',
    manifestPath: 'claude-project.sync.json',
    validators: [],
  };
  fs.mkdirSync(path.join(repoRoot, entry.packageRoot), { recursive: true });

  const result = checkSystem({ repoRoot, entry });
  assert.equal(result.exitCode, EXIT.INVALID_MANIFEST_OR_PATHS);
  assert.equal(result.findings.length, 1, 'exactly one finding, no pile-on from downstream checks');
  assert.equal(result.findings[0].code, CODE.MANIFEST_MISSING);
});

test('exit 2: an entirely absent package root also reports one clear finding', () => {
  const repoRoot = mkTempRepo();
  const entry = {
    id: 'nowhere',
    packageRoot: 'Nowhere',
    skillRoot: 'sk-nowhere',
    kernelPath: 'claude project/Custom Instructions.md',
    manifestPath: 'claude-project.sync.json',
    validators: [],
  };
  const result = checkSystem({ repoRoot, entry });
  assert.equal(result.exitCode, EXIT.INVALID_MANIFEST_OR_PATHS);
  assert.equal(result.findings.length, 1);
  assert.equal(result.findings[0].code, CODE.PACKAGE_ROOT_MISSING);
});

test('exit 2: an unmapped source under declared coverage blocks with UNMAPPED_SOURCE', () => {
  const repoRoot = mkTempRepo();
  const { entry, manifest } = buildCleanPackage(repoRoot);
  // Expand coverage so an unmapped file must be detected instead of ignored.
  manifest.sourceCoverage.include = [entry.skillRoot];
  writeFile(
    repoRoot,
    path.join(entry.packageRoot, entry.skillRoot, 'forgotten-reference.md'),
    'new file\n'
  );
  writeJson(repoRoot, path.join(entry.packageRoot, entry.manifestPath), manifest);

  const result = checkSystem({ repoRoot, entry });
  assert.equal(result.exitCode, EXIT.INVALID_MANIFEST_OR_PATHS);
  assert.ok(getFindingCodes(result).includes(CODE.UNMAPPED_SOURCE));
  assert.ok(
    result.findings.find((finding) => finding.code === CODE.UNMAPPED_SOURCE).message.includes(
      'forgotten-reference.md'
    )
  );
});

test('exit 3: no kernel-review.json at all requires review', () => {
  const repoRoot = mkTempRepo();
  const { entry } = buildCleanPackage(repoRoot, { withoutReview: true });
  const result = checkSystem({ repoRoot, entry });
  assert.equal(result.exitCode, EXIT.KERNEL_REVIEW_REQUIRED);
  assert.ok(getFindingCodes(result).includes(CODE.KERNEL_REVIEW_REQUIRED));
});

test(
  'exit 3: editing a contract input after the recorded review re-requires review (digest mismatch)',
  () => {
    const repoRoot = mkTempRepo();
    const { entry } = buildCleanPackage(repoRoot);
    writeFile(repoRoot, path.join(entry.packageRoot, 'AGENTS.md'), 'edited after review\n');
    const result = checkSystem({ repoRoot, entry });
    assert.equal(result.exitCode, EXIT.KERNEL_REVIEW_REQUIRED);
  }
);

test(
  'exit 3: editing the kernel file after the recorded review re-requires review ' +
    '(kernel hash mismatch)',
  () => {
    const repoRoot = mkTempRepo();
    const { entry } = buildCleanPackage(repoRoot);
    writeFile(
      repoRoot,
      path.join(entry.packageRoot, 'claude project/Custom Instructions.md'),
      'edited kernel\n'
    );
    const result = checkSystem({ repoRoot, entry });
    assert.equal(result.exitCode, EXIT.KERNEL_REVIEW_REQUIRED);
  }
);

test(
  'exit 4: a declared validator that fails is reported as VALIDATOR_FAILED only when ' +
    '--run-validators is requested',
  () => {
    const repoRoot = mkTempRepo();
    const { entry, manifest } = buildCleanPackage(repoRoot, {
      validators: [{
        name: 'always-fails',
        command: ['node', '-e', 'process.exit(1)'],
        cwd: '.',
      }],
    });
    manifest.validators = [{
      name: 'always-fails',
      command: ['node', '-e', 'process.exit(1)'],
      cwd: '.',
    }];
    writeJson(repoRoot, path.join(entry.packageRoot, entry.manifestPath), manifest);

    const withoutValidators = checkSystem({ repoRoot, entry });
    assert.equal(
      withoutValidators.exitCode,
      EXIT.CLEAN,
      'validators must not run unless requested'
    );

    const withValidators = checkSystem({ repoRoot, entry, options: { runValidators: true } });
    assert.equal(withValidators.exitCode, EXIT.VALIDATOR_FAILED);
    assert.ok(getFindingCodes(withValidators).includes(CODE.VALIDATOR_FAILED));
    // Preserve the empty-output failure case to guard against a misleading fallback message.
    const failure = withValidators.findings.find(
      (finding) => finding.code === CODE.VALIDATOR_FAILED
    );
    assert.ok(!failure.message.includes('undefined'), failure.message);
    assert.match(failure.message, /exited with status 1/);
  }
);

test('a passing validator does not affect the exit code', () => {
  const repoRoot = mkTempRepo();
  const { entry, manifest } = buildCleanPackage(repoRoot);
  manifest.validators = [{
    name: 'always-passes',
    command: ['node', '-e', 'process.exit(0)'],
    cwd: '.',
  }];
  writeJson(repoRoot, path.join(entry.packageRoot, entry.manifestPath), manifest);

  const result = checkSystem({ repoRoot, entry, options: { runValidators: true } });
  assert.equal(result.exitCode, EXIT.CLEAN);
});

test(
  'exit 5: a leftover sync journal is reported as INTERRUPTED_TRANSACTION ahead of ' +
    'every other check',
  () => {
    const repoRoot = mkTempRepo();
    const { entry } = buildCleanPackage(repoRoot);
    writeJson(repoRoot, path.join(entry.packageRoot, 'claude project/sync-journal.json'), {
      schemaVersion: 1,
      operations: [],
    });
    // Add an unrelated mirror error to prove the journal short-circuits later checks.
    writeFile(
      repoRoot,
      path.join(entry.packageRoot, 'claude project/knowledge', 'nonsense.md'),
      'x'
    );

    const result = checkSystem({ repoRoot, entry });
    assert.equal(result.exitCode, EXIT.INTERRUPTED_TRANSACTION);
    assert.equal(result.findings.length, 1);
    assert.equal(result.findings[0].code, CODE.INTERRUPTED_TRANSACTION);
  }
);

test('unknown knowledge file is reported, never auto-deleted', () => {
  const repoRoot = mkTempRepo();
  const { entry } = buildCleanPackage(repoRoot);
  const undeclaredAbs = path.join(
    repoRoot,
    entry.packageRoot,
    'claude project/knowledge/undeclared.md'
  );
  writeFile(
    repoRoot,
    path.join(entry.packageRoot, 'claude project/knowledge/undeclared.md'),
    'surprise\n'
  );

  const result = checkSystem({ repoRoot, entry });
  assert.ok(getFindingCodes(result).includes(CODE.UNKNOWN_KNOWLEDGE_FILE));
  assert.equal(fs.existsSync(undeclaredAbs), true, 'check must never delete the file itself');
});

test(
  'hash-prefix consistency: a tampered sha16 in package-lock.json is caught even if sha256 matches',
  () => {
    const repoRoot = mkTempRepo();
    const { entry, packageAbsRoot } = buildCleanPackage(repoRoot);
    const lockAbs = path.join(packageAbsRoot, 'claude project/package-lock.json');
    const lock = JSON.parse(fs.readFileSync(lockAbs, 'utf8'));
    lock.files[0].sha16 = 'ffffffffffffffff';
    fs.writeFileSync(lockAbs, JSON.stringify(lock, null, 2));

    const result = checkSystem({ repoRoot, entry });
    assert.ok(getFindingCodes(result).includes(CODE.HASH_PREFIX_MISMATCH));
  }
);

test('lock hash mismatch: a file changed after sync without re-locking is caught', () => {
  const repoRoot = mkTempRepo();
  const { entry, packageAbsRoot } = buildCleanPackage(repoRoot);
  writeFile(
    repoRoot,
    path.join(entry.packageRoot, 'claude project/Custom Instructions.md'),
    'drifted kernel\n'
  );

  const result = checkSystem({ repoRoot, entry });
  assert.ok(getFindingCodes(result).includes(CODE.LOCK_HASH_MISMATCH));
});

test(
  'generated regions: a declared region target missing its markers is flagged, ' +
    'not silently skipped',
  () => {
    const repoRoot = mkTempRepo();
    const { entry, manifest } = buildCleanPackage(repoRoot);
    manifest.generatedRegions = [{ target: 'SYNC.md', sections: ['PACKAGE FACTS'] }];
    writeJson(repoRoot, path.join(entry.packageRoot, entry.manifestPath), manifest);
    writeFile(
      repoRoot,
      path.join(entry.packageRoot, 'SYNC.md'),
      '# Sync\n\nHand prose only, no markers yet.\n'
    );

    const result = checkSystem({ repoRoot, entry });
    assert.ok(getFindingCodes(result).includes(CODE.REGION_NOT_SCAFFOLDED));
  }
);

test(
  'generated regions: present markers with the right section name satisfy the structural check',
  () => {
    const repoRoot = mkTempRepo();
    const { entry, manifest } = buildCleanPackage(repoRoot);
    manifest.generatedRegions = [{ target: 'SYNC.md', sections: ['PACKAGE FACTS'] }];
    writeJson(repoRoot, path.join(entry.packageRoot, entry.manifestPath), manifest);
    const scaffoldedRegion =
      '# Sync\n\n<!-- BEGIN GENERATED: AI-SYSTEM-SYNC PACKAGE FACTS -->\nbody\n' +
      '<!-- END GENERATED: AI-SYSTEM-SYNC PACKAGE FACTS -->\n';
    writeFile(repoRoot, path.join(entry.packageRoot, 'SYNC.md'), scaffoldedRegion);

    const result = checkSystem({ repoRoot, entry });
    assert.ok(!getFindingCodes(result).includes(CODE.REGION_NOT_SCAFFOLDED));
  }
);

test(
  'region reproduction: a hand edit inside an already-locked generated region is caught as drift',
  () => {
    const repoRoot = mkTempRepo();
    const { entry, manifest, packageAbsRoot } = buildCleanPackage(repoRoot);
    manifest.generatedRegions = [{ target: 'SYNC.md', sections: ['PACKAGE FACTS'] }];
    writeJson(repoRoot, path.join(entry.packageRoot, entry.manifestPath), manifest);

    const lockedBody = '30 mirrors locked.';
    writeFile(
      repoRoot,
      path.join(entry.packageRoot, 'SYNC.md'),
      `# Sync\n\n<!-- BEGIN GENERATED: AI-SYSTEM-SYNC PACKAGE FACTS -->\n${lockedBody}\n` +
        '<!-- END GENERATED: AI-SYSTEM-SYNC PACKAGE FACTS -->\n'
    );

    const lockAbs = path.join(packageAbsRoot, 'claude project/package-lock.json');
    const lock = JSON.parse(fs.readFileSync(lockAbs, 'utf8'));
    lock.regions = [{ target: 'SYNC.md', section: 'PACKAGE FACTS', sha256: sha256Hex(lockedBody) }];
    fs.writeFileSync(lockAbs, JSON.stringify(lock, null, 2));

    // Hand edit inside the markers, after the region was locked.
    const handEditedRegion =
      '# Sync\n\n<!-- BEGIN GENERATED: AI-SYSTEM-SYNC PACKAGE FACTS -->\n' +
      'hand-edited, no longer 30.\n' +
      '<!-- END GENERATED: AI-SYSTEM-SYNC PACKAGE FACTS -->\n';
    writeFile(repoRoot, path.join(entry.packageRoot, 'SYNC.md'), handEditedRegion);

    const result = checkSystem({ repoRoot, entry });
    assert.equal(result.exitCode, EXIT.MECHANICAL_DRIFT);
    assert.ok(getFindingCodes(result).includes(CODE.REGION_DRIFT));
  }
);

test('region reproduction: a locked region left untouched checks clean, no false positive', () => {
  const repoRoot = mkTempRepo();
  const { entry, manifest, packageAbsRoot } = buildCleanPackage(repoRoot);
  manifest.generatedRegions = [{ target: 'SYNC.md', sections: ['PACKAGE FACTS'] }];
  writeJson(repoRoot, path.join(entry.packageRoot, entry.manifestPath), manifest);

  const lockedBody = '30 mirrors locked.';
  writeFile(
    repoRoot,
    path.join(entry.packageRoot, 'SYNC.md'),
    `# Sync\n\n<!-- BEGIN GENERATED: AI-SYSTEM-SYNC PACKAGE FACTS -->\n${lockedBody}\n` +
      '<!-- END GENERATED: AI-SYSTEM-SYNC PACKAGE FACTS -->\n'
  );

  const lockAbs = path.join(packageAbsRoot, 'claude project/package-lock.json');
  const lock = JSON.parse(fs.readFileSync(lockAbs, 'utf8'));
  lock.regions = [{ target: 'SYNC.md', section: 'PACKAGE FACTS', sha256: sha256Hex(lockedBody) }];
  fs.writeFileSync(lockAbs, JSON.stringify(lock, null, 2));

  const result = checkSystem({ repoRoot, entry });
  assert.ok(!getFindingCodes(result).includes(CODE.REGION_DRIFT));
});

test('retired-token scanning finds a stale reference and reports file:line', () => {
  const repoRoot = mkTempRepo();
  const { entry, manifest } = buildCleanPackage(repoRoot, {
    retiredNames: ['Old Skill Name v0.9'],
  });
  manifest.retiredNames = ['Old Skill Name v0.9'];
  writeJson(repoRoot, path.join(entry.packageRoot, entry.manifestPath), manifest);
  writeFile(
    repoRoot,
    path.join(entry.packageRoot, 'README.md'),
    'See Old Skill Name v0.9 for background.\n'
  );

  const result = checkSystem({ repoRoot, entry });
  assert.ok(getFindingCodes(result).includes(CODE.RETIRED_TOKEN_FOUND));
  const finding = result.findings.find((candidate) => candidate.code === CODE.RETIRED_TOKEN_FOUND);
  assert.ok(finding.message.includes('README.md:1'));
});

test('retired-token scanning respects scanExcludes (changelog history is exempt)', () => {
  const repoRoot = mkTempRepo();
  const { entry, manifest } = buildCleanPackage(repoRoot);
  manifest.retiredNames = ['Old Skill Name v0.9'];
  manifest.scanExcludes = ['changelog'];
  writeJson(repoRoot, path.join(entry.packageRoot, entry.manifestPath), manifest);
  writeFile(
    repoRoot,
    path.join(entry.packageRoot, 'changelog/v0.9.md'),
    'Old Skill Name v0.9 was here.\n'
  );

  const result = checkSystem({ repoRoot, entry });
  assert.ok(!getFindingCodes(result).includes(CODE.RETIRED_TOKEN_FOUND));
});

test('JSON validity: a broken graph-metadata.json is reported, not crashed on', () => {
  const repoRoot = mkTempRepo();
  const { entry, packageAbsRoot } = buildCleanPackage(repoRoot);
  fs.writeFileSync(path.join(packageAbsRoot, entry.skillRoot, 'graph-metadata.json'), '{ broken');

  const result = checkSystem({ repoRoot, entry });
  assert.ok(getFindingCodes(result).includes(CODE.JSON_INVALID));
});

test(
  'graph-target validation: an edge target matching a fleet-wide retired name is flagged',
  () => {
    const repoRoot = mkTempRepo();
    const { entry } = buildCleanPackage(repoRoot);
    writeJson(repoRoot, path.join(entry.packageRoot, entry.skillRoot, 'graph-metadata.json'), {
      schema_version: 2,
      skill_id: entry.id,
      edges: {
        enhances: [{
          target: 'mcp-media-editor',
          weight: 0.5,
          context: 'stale cross-reference',
        }],
      },
    });

    const fleetRetiredNames = new Set(['mcp-media-editor']);
    const result = checkSystem({ repoRoot, entry, options: { fleetRetiredNames } });
    assert.ok(getFindingCodes(result).includes(CODE.GRAPH_TARGET_RETIRED));
  }
);

test(
  'derivation exceptions: a declared exception skips byte-parity for that one mirror only',
  () => {
    const repoRoot = mkTempRepo();
    const { entry, manifest, mirrorTarget } = buildCleanPackage(repoRoot);
    manifest.derivationExceptions = [{
      path: mirrorTarget,
      reason: 'link retargeting plus added frontmatter',
    }];
    writeJson(repoRoot, path.join(entry.packageRoot, entry.manifestPath), manifest);
    writeFile(
      repoRoot,
      path.join(entry.packageRoot, 'claude project/knowledge', mirrorTarget),
      'retargeted content, deliberately different from source\n'
    );
    // Remove the lock so the derivation exception is isolated from hash validation.
    const lockAbs = path.join(repoRoot, entry.packageRoot, 'claude project/package-lock.json');
    fs.unlinkSync(lockAbs);

    const result = checkSystem({ repoRoot, entry });
    assert.ok(
      !getFindingCodes(result).includes(CODE.MIRROR_BYTE_MISMATCH),
      JSON.stringify(result.findings)
    );
  }
);

test(
  'knowledge count mismatch is reported when the folder has more or fewer files than declared',
  () => {
    const repoRoot = mkTempRepo();
    const { entry } = buildCleanPackage(repoRoot);
    writeFile(
      repoRoot,
      path.join(entry.packageRoot, 'claude project/knowledge/extra-declared-later.md'),
      'x'
    );
    // Keep the extra file undeclared so the count check must fire independently.
    const result = checkSystem({ repoRoot, entry });
    assert.ok(getFindingCodes(result).includes(CODE.KNOWLEDGE_COUNT_MISMATCH));
  }
);

test(
  'a package that has never been synced (no knowledge/ folder yet) reports drift, ' +
    'not an invalid-manifest error',
  () => {
    const repoRoot = mkTempRepo();
    const { entry, packageAbsRoot } = buildCleanPackage(repoRoot, { withoutLock: true });
    fs.rmSync(path.join(packageAbsRoot, 'claude project/knowledge'), {
      recursive: true,
      force: true,
    });

    const result = checkSystem({ repoRoot, entry });
    assert.equal(result.exitCode, EXIT.MECHANICAL_DRIFT);
    assert.ok(getFindingCodes(result).includes(CODE.KNOWLEDGE_DIR_MISSING));
  }
);

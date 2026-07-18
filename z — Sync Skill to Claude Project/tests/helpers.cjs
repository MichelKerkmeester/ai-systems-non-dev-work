// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ TEST HELPERS                                                             ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// Keep fixture builders isolated from the fleet so every scenario is reproducible on demand.

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { computeContractDigest } = require('../lib/contract-digest.cjs');
const { hashFile } = require('../lib/hashing.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create an isolated temporary repository fixture.
 *
 * @returns {string} Absolute path to the temporary repository.
 */
function mkTempRepo() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'ai-system-sync-test-'));
}

/**
 * Write text content beneath a fixture repository.
 *
 * @param {string} repoRoot - Absolute fixture repository path.
 * @param {string} relPath - Repository-relative file path.
 * @param {string} content - File content to write.
 * @returns {string} Absolute path to the written file.
 */
function writeFile(repoRoot, relPath, content) {
  const abs = path.join(repoRoot, relPath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
  return abs;
}

/**
 * Write formatted JSON beneath a fixture repository.
 *
 * @param {string} repoRoot - Absolute fixture repository path.
 * @param {string} relPath - Repository-relative file path.
 * @param {Object} data - JSON-compatible value to serialize.
 * @returns {void}
 */
function writeJson(repoRoot, relPath, data) {
  writeFile(repoRoot, relPath, `${JSON.stringify(data, null, 2)}\n`);
}

/**
 * Build a self-consistent package fixture that starts in a clean state.
 *
 * @param {string} repoRoot - Absolute fixture repository path.
 * @param {Object} [options] - Fixture values and optional state omissions.
 * @returns {Object} Fixture paths, manifest data and registry entry.
 */
function buildCleanPackage(repoRoot, options) {
  const fixtureOptions = options || {};
  const id = fixtureOptions.id || 'fixture-system';
  const packageRoot = fixtureOptions.packageRoot || 'Fixture System';
  const skillRoot = fixtureOptions.skillRoot || `sk-${id}`;
  const packageAbsRoot = path.join(repoRoot, packageRoot);

  const skillMdSource = fixtureOptions.skillMdContent || '# Fixture Skill\n\nBody text.\n';
  writeFile(repoRoot, path.join(packageRoot, 'AGENTS.md'), '# Fixture Agents\n');
  writeFile(repoRoot, path.join(packageRoot, skillRoot, 'SKILL.md'), skillMdSource);
  writeJson(repoRoot, path.join(packageRoot, skillRoot, 'description.json'), {
    name: id,
    description: 'fixture',
    version: '1.0.0.0',
  });
  writeJson(repoRoot, path.join(packageRoot, skillRoot, 'graph-metadata.json'), {
    schema_version: 2,
    skill_id: id,
    edges: { enhances: [], siblings: [], conflicts_with: [], depends_on: [], prerequisite_for: [] },
  });

  const kernelContent =
    fixtureOptions.kernelContent || '# Fixture Kernel\n\nSynthesized instructions.\n';
  writeFile(
    repoRoot,
    path.join(packageRoot, 'claude project', 'Custom Instructions.md'),
    kernelContent
  );

  const mirrorTarget = fixtureOptions.mirrorTarget || `${id} - System - Skill - v1.0.0.md`;
  writeFile(
    repoRoot,
    path.join(packageRoot, 'claude project', 'knowledge', mirrorTarget),
    skillMdSource
  );

  const manifest = {
    schemaVersion: 1,
    id,
    skillRoot,
    skillId: id,
    knowledgeRoot: 'claude project/knowledge',
    kernel: {
      path: 'claude project/Custom Instructions.md',
      version: '1.0.0',
      alignedSkillVersion: '1.0.0',
    },
    sourceCoverage: { include: [`${skillRoot}/SKILL.md`], exclude: [] },
    mirrors: [
      {
        source: `${skillRoot}/SKILL.md`,
        target: mirrorTarget,
        sourceVersion: '1.0.0',
        projectVersion: '1.0.0',
      },
    ],
    contractInputs: ['AGENTS.md', `${skillRoot}/SKILL.md`],
    validators: fixtureOptions.validators || [],
    retiredNames: fixtureOptions.retiredNames || [],
    scanExcludes: fixtureOptions.scanExcludes || [],
    expectedKnowledgeCount: 1,
    derivationExceptions: fixtureOptions.derivationExceptions || [],
    generatedRegions: fixtureOptions.generatedRegions || [],
  };
  writeJson(repoRoot, path.join(packageRoot, 'claude-project.sync.json'), manifest);

  const entry = {
    id,
    packageRoot,
    skillRoot,
    kernelPath: 'claude project/Custom Instructions.md',
    manifestPath: 'claude-project.sync.json',
    validators: [],
  };

  if (!fixtureOptions.withoutReview) {
    const digest = computeContractDigest(packageAbsRoot, manifest.contractInputs);
    const kernelPath = path.join(packageAbsRoot, 'claude project/Custom Instructions.md');
    const kernelSha256 = hashFile(kernelPath).sha256;
    writeJson(repoRoot, path.join(packageRoot, 'claude project', 'kernel-review.json'), {
      schemaVersion: 1,
      systemId: id,
      reviewer: 'test-reviewer',
      reason: 'fixture baseline',
      decision: 'updated',
      reviewedAt: new Date(0).toISOString(),
      contractDigest: digest,
      kernelSha256,
      kernelVersion: manifest.kernel.version,
      alignedSkillVersion: manifest.kernel.alignedSkillVersion,
    });
  }

  if (!fixtureOptions.withoutLock) {
    const kernelPath = path.join(packageAbsRoot, 'claude project/Custom Instructions.md');
    const mirrorPath = path.join(packageAbsRoot, 'claude project/knowledge', mirrorTarget);
    const kernelHash = hashFile(kernelPath);
    const mirrorHash = hashFile(mirrorPath);
    writeJson(repoRoot, path.join(packageRoot, 'claude project', 'package-lock.json'), {
      schemaVersion: 1,
      systemId: id,
      generatedAt: new Date(0).toISOString(),
      files: [
        {
          path: 'claude project/Custom Instructions.md',
          sha256: kernelHash.sha256,
          sha16: kernelHash.sha16,
          bytes: kernelHash.bytes,
        },
        {
          path: `claude project/knowledge/${mirrorTarget}`,
          sha256: mirrorHash.sha256,
          sha16: mirrorHash.sha16,
          bytes: mirrorHash.bytes,
        },
      ],
      regions: [],
      deletable: [`claude project/knowledge/${mirrorTarget}`],
    });
  }

  return { repoRoot, packageAbsRoot, packageRoot, manifest, entry, mirrorTarget, skillRoot };
}

/**
 * Build a minimal registry containing the supplied fixture entries.
 *
 * @param {...Object} entries - Registry entries to include.
 * @returns {Object} Registry-shaped fixture data.
 */
function registryOf(...entries) {
  return { schemaVersion: 1, systems: entries };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = { mkTempRepo, writeFile, writeJson, buildCleanPackage, registryOf };

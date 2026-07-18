// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ RENDER TESTS                                                             ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { hashFile } = require('../lib/hashing.cjs');
const {
  shortLabel,
  commonTargetPrefix,
  renderInventorySection,
  renderChecksumsSection,
  renderSmokeVersionPinsSection,
  renderSection,
  MirrorNotDeclaredError,
  UnknownSectionError,
} = require('../lib/render.cjs');
const { mkTempRepo, writeFile } = require('./helpers.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function fixtureManifest() {
  return {
    kernel: { version: '1.3.0', alignedSkillVersion: '1.4.0' },
    mirrors: [
      {
        source: 'sk-product-owner/SKILL.md',
        target: 'Product Owner - System - Skill - v1.4.0.md',
        sourceVersion: '1.4.0',
        projectVersion: '1.4.0',
      },
      {
        source: 'sk-product-owner/references/task-mode.md',
        target: 'Product Owner - Templates - Task Mode - v0.303.md',
        sourceVersion: '0.303',
        projectVersion: '0.303',
      },
      {
        source: 'sk-product-owner/references/bug-mode.md',
        target: 'Product Owner - Templates - Bug Mode - v0.203.md',
        sourceVersion: '0.203',
        projectVersion: '0.203',
      },
      {
        source: 'sk-product-owner/assets/examples/bug/bug-example-quick.md',
        target: 'Product Owner - Examples - Bug - Quick Bug - v0.100.md',
        sourceVersion: '0.100',
        projectVersion: '0.100',
      },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. TESTS
// ─────────────────────────────────────────────────────────────────────────────

test('shortLabel drops a given system prefix, extension and trailing pinned version', () => {
  assert.equal(
    shortLabel('Product Owner - System - Skill - v1.4.0.md', 'Product Owner - '),
    'System - Skill'
  );
  assert.equal(
    shortLabel('Product Owner - Examples - Bug - Quick Bug - v0.100.md', 'Product Owner - '),
    'Examples - Bug - Quick Bug'
  );
});

test(
  'shortLabel leaves the target untouched when no prefix is given or the target does not ' +
    'start with it',
  () => {
    assert.equal(
      shortLabel('Copywriter - System - Skill - v1.2.0.md'),
      'Copywriter - System - Skill'
    );
    assert.equal(
      shortLabel('Copywriter - System - Skill - v1.2.0.md', 'Product Owner - '),
      'Copywriter - System - Skill'
    );
  }
);

test(
  'commonTargetPrefix derives the shared leading segment from the mirrors themselves, ' +
    'not a hardcoded system name',
  () => {
    assert.equal(
      commonTargetPrefix([
        { target: 'Copywriter - System - Skill - v1.2.0.md' },
        { target: 'Copywriter - Context - Brand - v0.130.md' },
      ]),
      'Copywriter - '
    );
    assert.equal(commonTargetPrefix(fixtureManifest().mirrors), 'Product Owner - ');
    assert.equal(commonTargetPrefix([]), '');
    assert.equal(commonTargetPrefix([{ target: 'NoDelimiterHere.md' }]), '');
  }
);

test('renderInventorySection lists every mirror and the declared counts, nothing else', () => {
  const body = renderInventorySection(fixtureManifest());
  assert.match(
    body,
    /\| `sk-product-owner\/SKILL\.md` \| `Product Owner - System - Skill - v1\.4\.0\.md` \|/
  );
  assert.match(body, /\*\*Declared mirrors:\*\* 4/);
  assert.match(body, /\*\*Skill version:\*\* 1\.4\.0/);
  assert.match(body, /\*\*Custom Instructions version:\*\* 1\.3\.0 \(aligned to Skill 1\.4\.0\)/);
});

test(
  'renderInventorySection is deterministic: same manifest renders byte-identical output twice',
  () => {
    const manifest = fixtureManifest();
    assert.equal(renderInventorySection(manifest), renderInventorySection(manifest));
  }
);

test(
  'renderChecksumsSection reads live source bytes, not manifest-declared versions, for the sha16',
  () => {
    const repoRoot = mkTempRepo();
    const packageAbsRoot = path.join(repoRoot, 'Fixture');
    const skillContent = '# Skill\n\nBody.\n';
    writeFile(repoRoot, 'Fixture/sk-product-owner/SKILL.md', skillContent);
    writeFile(repoRoot, 'Fixture/sk-product-owner/references/task-mode.md', 'Task mode body.\n');
    writeFile(repoRoot, 'Fixture/sk-product-owner/references/bug-mode.md', 'Bug mode body.\n');
    writeFile(
      repoRoot,
      'Fixture/sk-product-owner/assets/examples/bug/bug-example-quick.md',
      'Bug example body.\n'
    );
    const kernelAbsPath = writeFile(
      repoRoot,
      'Fixture/claude project/Custom Instructions.md',
      '# Kernel\n'
    );

    const manifest = fixtureManifest();
    const body = renderChecksumsSection({ manifest, packageAbsRoot, kernelAbsPath });

    const expectedSkillSha16 = hashFile(
      path.join(packageAbsRoot, 'sk-product-owner/SKILL.md')
    ).sha16;
    const expectedKernelSha16 = hashFile(kernelAbsPath).sha16;
    const expectedSkillPattern = [
      'knowledge/ System - Skill \\| v1\\.4\\.0 -> v1\\.4\\.0, sha16 `',
      expectedSkillSha16,
      '`',
    ].join('');
    assert.match(body, new RegExp(expectedSkillPattern));
    assert.match(body, new RegExp(`Custom Instructions.*sha16 \`${expectedKernelSha16}\``));

    // Render from disk so changing source bytes changes the checksum output.
    fs.writeFileSync(
      path.join(packageAbsRoot, 'sk-product-owner/SKILL.md'),
      skillContent + 'more.\n'
    );
    const updatedBody = renderChecksumsSection({ manifest, packageAbsRoot, kernelAbsPath });
    assert.notEqual(body, updatedBody);
  }
);

test(
  'renderSection dispatches by name and rejects an undeclared section rather than guessing',
  () => {
    const manifest = fixtureManifest();
    assert.equal(renderSection('INVENTORY', { manifest }), renderInventorySection(manifest));
    assert.throws(() => renderSection('NOT-A-REAL-SECTION', { manifest }), UnknownSectionError);
  }
);

test(
  'renderSmokeVersionPinsSection pulls Task/Bug Mode versions from the declared mirrors, ' +
    'not a second hand-typed number',
  () => {
    const manifest = fixtureManifest();
    assert.equal(
      renderSmokeVersionPinsSection(manifest),
      '- Task and Bug behavior remains compatible with the pinned v0.303 and v0.203 references.'
    );
  }
);

test(
  'renderSmokeVersionPinsSection tracks a version bump automatically, closing the exact drift ' +
    'class it replaces',
  () => {
    const manifest = fixtureManifest();
    const bumped = {
      ...manifest,
      mirrors: manifest.mirrors.map((mirror) =>
        mirror.source === 'sk-product-owner/references/task-mode.md'
          ? { ...mirror, sourceVersion: '0.304' }
          : mirror
      ),
    };
    assert.match(renderSmokeVersionPinsSection(bumped), /pinned v0\.304 and v0\.203 references/);
  }
);

test(
  'renderSmokeVersionPinsSection throws rather than rendering an undefined version ' +
    'if a mode mirror is undeclared',
  () => {
    const manifest = fixtureManifest();
    const withoutBugMode = {
      ...manifest,
      mirrors: manifest.mirrors.filter((mirror) => !mirror.source.includes('bug-mode')),
    };
    assert.throws(() => renderSmokeVersionPinsSection(withoutBugMode), MirrorNotDeclaredError);
  }
);

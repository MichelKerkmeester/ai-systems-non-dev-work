// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Generated Rendering                                                      ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS/REQUIRES
// ─────────────────────────────────────────────────────────────────────────────

const { hashFile, sha256Hex } = require('./hashing.cjs');
const { renderMirrorBytes } = require('./mirrors.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Derive the shared system-name prefix from mirror targets.
 *
 * @param {{target: string}[]} mirrors - Manifest mirror entries.
 * @returns {string} Shared prefix or an empty string when none is available.
 */
function commonTargetPrefix(mirrors) {
  // A lone target cannot distinguish its system-name prefix from its version label.
  if (mirrors.length < 2) return '';
  let prefix = mirrors[0].target;
  for (const mirror of mirrors.slice(1)) {
    let index = 0;
    while (
      index < prefix.length &&
      index < mirror.target.length &&
      prefix[index] === mirror.target[index]
    ) {
      index += 1;
    }
    prefix = prefix.slice(0, index);
    if (!prefix) break;
  }
  // The first delimiter keeps category words in the label instead of the prefix.
  const cut = prefix.indexOf(' - ');
  return cut >= 0 ? prefix.slice(0, cut + 3) : '';
}

/**
 * Convert a mirror target filename into its short display label.
 *
 * @param {string} target - Mirror target filename.
 * @param {string} [prefix] - System-name prefix to remove.
 * @returns {string} Display label without extension or pinned version.
 */
function shortLabel(target, prefix = '') {
  let label = target;
  if (prefix && label.startsWith(prefix)) {
    label = label.slice(prefix.length);
  }
  return label.replace(/\.md$/, '').replace(/ - v[\d.]+$/, '');
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. CORE LOGIC
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render the source-to-mirror inventory section.
 *
 * @param {{mirrors: object[], kernel: object}} manifest - Loaded manifest.
 * @returns {string} Markdown inventory section.
 */
function renderInventorySection(manifest) {
  const lines = ['| Authoritative source | Claude Project Knowledge mirror |', '| --- | --- |'];
  for (const mirror of manifest.mirrors) {
    lines.push(`| \`${mirror.source}\` | \`${mirror.target}\` |`);
  }
  lines.push('');
  lines.push(`**Declared mirrors:** ${manifest.mirrors.length}`);
  lines.push(`**Skill version:** ${manifest.kernel.alignedSkillVersion}`);
  lines.push(
    `**Custom Instructions version:** ${manifest.kernel.version} ` +
      `(aligned to Skill ${manifest.kernel.alignedSkillVersion})`
  );
  return lines.join('\n');
}

/**
 * Render the live checksum section for the kernel and mirrors.
 *
 * @param {object} context - Render context.
 * @returns {string} Markdown checksum section.
 */
function renderChecksumsSection({ manifest, packageAbsRoot, kernelAbsPath }) {
  const lines = ['| Document | Sync stamp |', '| --- | --- |'];
  const kernelHash = hashFile(kernelAbsPath);
  lines.push(
    `| **Custom Instructions** | project kernel v${manifest.kernel.version} -> ` +
      `Skill v${manifest.kernel.alignedSkillVersion}, sha16 \`${kernelHash.sha16}\` |`
  );
  const prefix = commonTargetPrefix(manifest.mirrors);
  for (const mirror of manifest.mirrors) {
    const renderedBytes = renderMirrorBytes({ packageAbsRoot, manifest, mirror });
    const mirrorSha16 = sha256Hex(renderedBytes).slice(0, 16);
    lines.push(
      `| knowledge/ ${shortLabel(mirror.target, prefix)} | v${mirror.projectVersion} -> ` +
        `v${mirror.sourceVersion}, sha16 \`${mirrorSha16}\` |`
    );
  }
  return lines.join('\n');
}

/** Error raised when a requested mirror is undeclared. */
class MirrorNotDeclaredError extends Error {}

/**
 * Find a declared mirror by source path.
 *
 * @param {{mirrors: object[]}} manifest - Loaded manifest.
 * @param {string} sourcePath - Source path to find.
 * @returns {object} Matching mirror entry.
 * @throws {MirrorNotDeclaredError} When the source is not declared.
 */
function mirrorBySource(manifest, sourcePath) {
  const mirror = manifest.mirrors.find((m) => m.source === sourcePath);
  if (!mirror) {
    throw new MirrorNotDeclaredError(`No mirror declared for source "${sourcePath}"`);
  }
  return mirror;
}

/**
 * Render the pinned Task and Bug mode versions.
 *
 * @param {{mirrors: object[]}} manifest - Loaded manifest.
 * @returns {string} Markdown version-pin sentence.
 * @throws {MirrorNotDeclaredError} When either mode mirror is absent.
 */
function renderSmokeVersionPinsSection(manifest) {
  const taskVersion = mirrorBySource(
    manifest,
    'sk-product-owner/references/task-mode.md'
  ).sourceVersion;
  const bugVersion = mirrorBySource(
    manifest,
    'sk-product-owner/references/bug-mode.md'
  ).sourceVersion;
  return (
    `- Task and Bug behavior remains compatible with the pinned v${taskVersion} ` +
    `and v${bugVersion} references.`
  );
}

/** Error raised when a generated section has no renderer. */
class UnknownSectionError extends Error {}

/**
 * Render one declared generated-region section body by name.
 *
 * @param {string} section - Section name from the manifest.
 * @param {object} ctx - Render context.
 * @returns {string} Generated section body.
 * @throws {UnknownSectionError} When no renderer is registered for the section.
 */
function renderSection(section, ctx) {
  switch (section) {
    case 'INVENTORY':
      return renderInventorySection(ctx.manifest);
    case 'CHECKSUMS':
      return renderChecksumsSection(ctx);
    case 'SMOKE_VERSION_PINS':
      return renderSmokeVersionPinsSection(ctx.manifest);
    default:
      throw new UnknownSectionError(
        `No renderer registered for generated-region section "${section}"`
      );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  shortLabel,
  commonTargetPrefix,
  mirrorBySource,
  renderInventorySection,
  renderChecksumsSection,
  renderSmokeVersionPinsSection,
  renderSection,
  MirrorNotDeclaredError,
  UnknownSectionError,
};

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Mirror Rendering                                                         ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const PROJECT_SKILL_RENDERER = 'project-skill-mirror-v1';

class MirrorRenderError extends Error {}

function findDerivationException(manifest, target) {
  return (manifest.derivationExceptions || []).find((entry) => entry.path === target) || null;
}

function yamlScalar(value) {
  return JSON.stringify(value);
}

function addProjectFrontmatter(source, mirror, exception) {
  if (!source.startsWith('---\n')) {
    throw new MirrorRenderError(`Project Skill renderer requires YAML frontmatter: ${mirror.source}`);
  }
  const closingIndex = source.indexOf('\n---\n', 4);
  if (closingIndex < 0) {
    throw new MirrorRenderError(`Project Skill renderer found unclosed frontmatter: ${mirror.source}`);
  }

  const frontmatter = source.slice(4, closingIndex).split('\n');
  const nameIndex = frontmatter.findIndex((line) => line.startsWith('name:'));
  if (nameIndex < 0) {
    throw new MirrorRenderError(`Project Skill renderer requires a name field: ${mirror.source}`);
  }
  frontmatter.splice(nameIndex + 1, 0, `title: ${path.posix.basename(mirror.target, '.md')}`);

  const project = exception.projectFrontmatter;
  frontmatter.push(`contextType: ${project.contextType}`);
  frontmatter.push(`importance_tier: ${project.importanceTier}`);
  frontmatter.push('trigger_phrases:');
  for (const phrase of project.triggerPhrases) {
    frontmatter.push(`  - ${yamlScalar(phrase)}`);
  }
  return `---\n${frontmatter.join('\n')}\n---\n${source.slice(closingIndex + 5)}`;
}

function retargetProjectLinks(source, manifest, mirror) {
  const sourceDirectory = path.posix.dirname(mirror.source);
  let replacementCount = 0;
  const rendered = source.replace(/\]\(\.\/(references|assets)\/([^)]+)\)/g, (match, folder, name) => {
    const linkedSource = path.posix.normalize(path.posix.join(sourceDirectory, folder, name));
    const linkedMirror = manifest.mirrors.find((candidate) => candidate.source === linkedSource);
    if (!linkedMirror) {
      throw new MirrorRenderError(
        `Project Skill renderer cannot map ${linkedSource} from ${mirror.source}`
      );
    }
    replacementCount += 1;
    return `](<${linkedMirror.target}>)`;
  });
  if (replacementCount === 0) {
    throw new MirrorRenderError(`Project Skill renderer found no project links in ${mirror.source}`);
  }
  return rendered;
}

function renderMirrorBytes({ packageAbsRoot, manifest, mirror }) {
  const sourceAbs = path.join(packageAbsRoot, mirror.source);
  const sourceBuffer = fs.readFileSync(sourceAbs);
  const exception = findDerivationException(manifest, mirror.target);
  if (!exception) return sourceBuffer;
  if (exception.renderer !== PROJECT_SKILL_RENDERER) {
    throw new MirrorRenderError(
      `Unsupported derivation renderer "${exception.renderer}" for ${mirror.target}`
    );
  }

  const withFrontmatter = addProjectFrontmatter(sourceBuffer.toString('utf8'), mirror, exception);
  return Buffer.from(retargetProjectLinks(withFrontmatter, manifest, mirror), 'utf8');
}

module.exports = {
  PROJECT_SKILL_RENDERER,
  MirrorRenderError,
  findDerivationException,
  renderMirrorBytes,
};

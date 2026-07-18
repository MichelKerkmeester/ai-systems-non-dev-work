// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ REGION TESTS                                                             ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  renderRegion,
  extractRegion,
  replaceRegion,
  regionReproducesExactly,
  listSections,
  RegionNotFoundError,
} = require('../lib/regions.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. TESTS
// ─────────────────────────────────────────────────────────────────────────────

test('renderRegion + extractRegion round-trip byte-exact', () => {
  const body = 'line one\nline two';
  const rendered = renderRegion('PACKAGE FACTS', body);
  const expectedRegion = [
    '<!-- BEGIN GENERATED: AI-SYSTEM-SYNC PACKAGE FACTS -->',
    body,
    '<!-- END GENERATED: AI-SYSTEM-SYNC PACKAGE FACTS -->',
  ].join('\n');
  assert.equal(rendered, expectedRegion);
  assert.equal(extractRegion(rendered, 'PACKAGE FACTS'), body);
});

test('extractRegion returns null when markers are absent (not yet scaffolded)', () => {
  assert.equal(extractRegion('no markers here at all', 'PACKAGE FACTS'), null);
});

test('replaceRegion preserves hand-authored prose outside the markers', () => {
  const original =
    'Hand prose before.\n' +
    renderRegion('PACKAGE FACTS', 'old body') +
    '\nHand prose after.';
  const updated = replaceRegion(original, 'PACKAGE FACTS', 'new body');
  assert.ok(updated.startsWith('Hand prose before.\n'));
  assert.ok(updated.endsWith('\nHand prose after.'));
  assert.equal(extractRegion(updated, 'PACKAGE FACTS'), 'new body');
});

test('replaceRegion throws RegionNotFoundError when markers are missing', () => {
  assert.throws(() => replaceRegion('no markers', 'PACKAGE FACTS', 'x'), RegionNotFoundError);
});

test('regionReproducesExactly distinguishes not-scaffolded from drifted from matching', () => {
  const notScaffolded = regionReproducesExactly('nothing here', 'SECTION', 'expected');
  assert.deepEqual(notScaffolded, { scaffolded: false, matches: false });

  const drifted = regionReproducesExactly(
    renderRegion('SECTION', 'hand-edited body'),
    'SECTION',
    'expected body'
  );
  assert.deepEqual(drifted, { scaffolded: true, matches: false });

  const matching = regionReproducesExactly(
    renderRegion('SECTION', 'expected body'),
    'SECTION',
    'expected body'
  );
  assert.deepEqual(matching, { scaffolded: true, matches: true });
});

test('multiple named regions in one file are independent', () => {
  let content = 'Top.\n';
  content += `${renderRegion('ONE', 'body one')}\n`;
  content += `${renderRegion('TWO', 'body two')}\n`;
  content += 'Bottom.';

  assert.equal(extractRegion(content, 'ONE'), 'body one');
  assert.equal(extractRegion(content, 'TWO'), 'body two');

  const updated = replaceRegion(content, 'ONE', 'body one v2');
  assert.equal(extractRegion(updated, 'ONE'), 'body one v2');
  assert.equal(
    extractRegion(updated, 'TWO'),
    'body two',
    'untouched region must survive a sibling replace'
  );

  assert.deepEqual(listSections(updated), ['ONE', 'TWO']);
});

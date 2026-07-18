// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Exit Codes                                                               ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

// Keep state codes stable because hooks and CI interpret their numeric values.
const EXIT = Object.freeze({
  CLEAN: 0,
  MECHANICAL_DRIFT: 1,
  INVALID_MANIFEST_OR_PATHS: 2,
  KERNEL_REVIEW_REQUIRED: 3,
  VALIDATOR_FAILED: 4,
  INTERRUPTED_TRANSACTION: 5,
  LIVE_RECEIPT_STALE: 6,
  USAGE: 64,
});

const EXIT_MEANING = Object.freeze({
  [EXIT.CLEAN]: 'Requested state is clean',
  [EXIT.MECHANICAL_DRIFT]: 'Mechanical drift',
  [EXIT.INVALID_MANIFEST_OR_PATHS]: 'Invalid manifest, path, inventory, or symlink',
  [EXIT.KERNEL_REVIEW_REQUIRED]: 'Kernel review required',
  [EXIT.VALIDATOR_FAILED]: 'Package validator failed',
  [EXIT.INTERRUPTED_TRANSACTION]: 'Interrupted transaction or recovery required',
  [EXIT.LIVE_RECEIPT_STALE]: 'Live deployment receipt stale or absent',
  [EXIT.USAGE]: 'CLI usage error (not a fleet state)',
});

/**
 * Aggregation precedence when a fleet-wide command (`--all`) rolls many
 * systems' individual exit codes into one process exit code. Worst-first,
 * where "worst" means "least safe to ignore": an interrupted transaction can
 * leave a package half-written, so it outranks even an outright invalid
 * manifest, which in turn outranks the softer signals below it. This order
 * is a documented judgment call layered on top of the design authority's
 * table, which only defines what each single code means on its own.
 */
const AGGREGATION_PRIORITY = [
  EXIT.INTERRUPTED_TRANSACTION,
  EXIT.INVALID_MANIFEST_OR_PATHS,
  EXIT.VALIDATOR_FAILED,
  EXIT.KERNEL_REVIEW_REQUIRED,
  EXIT.MECHANICAL_DRIFT,
  EXIT.LIVE_RECEIPT_STALE,
  EXIT.CLEAN,
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. CORE LOGIC
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Return the highest-priority exit code in a collection.
 *
 * @param {number[]} codes - Exit codes reported by individual checks.
 * @returns {number} The highest-priority code or the clean code.
 */
function worstExitCode(codes) {
  const set = new Set(codes);
  for (const code of AGGREGATION_PRIORITY) {
    if (set.has(code)) return code;
  }
  return EXIT.CLEAN;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = { EXIT, EXIT_MEANING, AGGREGATION_PRIORITY, worstExitCode };

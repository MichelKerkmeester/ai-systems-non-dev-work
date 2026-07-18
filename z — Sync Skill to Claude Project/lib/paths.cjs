// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Package Paths                                                            ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

// Keep generated-state locations centralized so check and transaction code cannot diverge.

// ─────────────────────────────────────────────────────────────────────────────
// 2. EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = Object.freeze({
  JOURNAL_REL_PATH: 'claude project/sync-journal.json',
  LOCK_REL_PATH: 'claude project/package-lock.json',
  KERNEL_REVIEW_REL_PATH: 'claude project/kernel-review.json',
  UPLOAD_RECEIPT_REL_PATH: 'claude project/upload-receipt.json',
  REPO_LOCK_FILENAME: '.ai-system-sync.lock',
});

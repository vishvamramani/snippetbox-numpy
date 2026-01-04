const vscode = require("vscode");

// Per-file alias cache
const aliasCache = new Map();

// Global fallback alias
let currentAlias = "np";

/**
 * Watch Python files for NumPy alias changes
 */
function NumpyAliasWatcher() {
  vscode.workspace.onDidChangeTextDocument((event) => {
    const doc = event.document;

    if (doc.languageId !== "python") return;

    // Only check top 20 lines for imports
    const isImportEdit = event.contentChanges.some(
      (c) => c.range.start.line < 20
    );
    if (!isImportEdit) return;

    const fileKey = doc.uri.toString();

    // Fast detection without setTimeout
    const alias = detectAliasFromTop(doc);
    if (!alias) return;

    const cached = aliasCache.get(fileKey);
    if (alias !== cached) {
      aliasCache.set(fileKey, alias);

      // Update global alias too
      currentAlias = alias;

      
    }
  });
}

/**
 * Get current NumPy alias for a document (fast)
 * @param {vscode.TextDocument} document
 * @returns {string} alias
 */
function getNumpyAlias(document) {
  if (!document) return currentAlias;
  const fileKey = document.uri.toString();

  // Return cached alias if exists
  if (aliasCache.has(fileKey)) return aliasCache.get(fileKey);

  // Otherwise, scan top 20 lines immediately
  const alias = detectAliasFromTop(document) || currentAlias;
  aliasCache.set(fileKey, alias);
  currentAlias = alias; // update global
  return alias;
}

/**
 * Detect alias by scanning top lines
 */
function detectAliasFromTop(document) {
  const maxLines = Math.min(20, document.lineCount);
  for (let i = 0; i < maxLines; i++) {
    const line = document.lineAt(i).text;

    const m = line.match(/^\s*import\s+numpy\s+as\s+(\w+)/);
    if (m) return m[1];

    if (/^\s*import\s+numpy\b/.test(line)) return "numpy";
  }
  return null;
}

module.exports = {
  NumpyAliasWatcher,
  getNumpyAlias,
};

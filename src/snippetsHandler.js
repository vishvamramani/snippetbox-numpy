const vscode = require("vscode");
const { getNumpyAlias } = require("./numpyAliasWatcher");
const path = require("path");
const fs = require("fs");

let numpyMethods = null;

// Load all NumPy methods (flat list) from JSON
function loadNumpyMethods() {
  if (numpyMethods) return numpyMethods;

  const jsonPath = path.join(__dirname, "extensiont.json"); // your JSON file
  try {
    const raw = fs.readFileSync(jsonPath, "utf-8");
    numpyMethods = JSON.parse(raw);
    return numpyMethods;
  } catch (err) {
    console.error("Failed to load extensiont.json", err);
    numpyMethods = [];
    return [];
  }
}

/**
 * Generate VS Code CompletionItems for all NumPy methods
 * @param {vscode.TextDocument} document
 */
function snippetsHandler(document) {
  if (!document) return [];

  const alias = getNumpyAlias(document); // e.g., np
  const methods = loadNumpyMethods();

  const items = methods.map((method) => {
    const snippet = new vscode.SnippetString(`${alias}.${method}($1)`);

    const item = new vscode.CompletionItem(
      `${alias}.${method}`,
      vscode.CompletionItemKind.Snippet
    );

    item.insertText = snippet;
    item.detail = `NumPy method: ${method}`;
    item.documentation = `Auto-completion for ${alias}.${method}`;
    return item;
  });

  return items;
}

module.exports = {
  snippetsHandler,
};

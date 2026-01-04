const vscode = require("vscode");
const { getNumpyAlias } = require("./numpyAliasWatcher");
const { loadNumpyMethods } = require("./loadMethods");

/**
 * Return filtered NumPy CompletionItems based on user typing
 * Ignores lines that are import statements
 * @param {vscode.TextDocument} document
 * @param {vscode.Position} position
 */
function snippetsHandler(document, position) {
  if (!document) return [];

  // Get the current line text
  const lineText = document.lineAt(position.line).text.trim();

  // Skip if the line starts with 'import' or 'from'
  if (lineText.startsWith("import") || lineText.startsWith("from")) {
    return [];
  }

  const alias = getNumpyAlias(document);
  const methods = loadNumpyMethods();
  if (!methods || methods.length === 0) return [];

  // Get the word before cursor
  const wordRange = document.getWordRangeAtPosition(position, /\w+/);
  const typed = wordRange ? document.getText(wordRange) : "";

  // Remove alias prefix if user typed 'alias.'
  let typedMethod = typed;
  if (typed.startsWith(`${alias}.`)) {
    typedMethod = typed.substring(alias.length + 1);
  }

  // Filter methods that start with typed string
  const matchingMethods = methods.filter((m) =>
    m.toLowerCase().startsWith(typedMethod.toLowerCase())
  );

  // Create CompletionItems
  const items = matchingMethods.map((method) => {
    const snippet = new vscode.SnippetString(`${method}($1)`);

    const item = new vscode.CompletionItem(
      method,
      vscode.CompletionItemKind.Method
    );
    item.insertText = snippet;
    item.detail = `NumPy method: ${alias}.${method}`;
    item.documentation = `Auto-completion for ${alias}.${method}`;
    return item;
  });

  return items;
}

module.exports = {
  snippetsHandler,
};

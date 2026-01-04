const vscode = require("vscode");
const { NumpyAliasWatcher } = require("./src/numpyAliasWatcher");
const { snippetsHandler } = require("./src/autoSnippetHandler");

function activate(context) {
  // Start watching alias changes
  NumpyAliasWatcher();

  // Enable auto snippet insertion
  const provider = vscode.languages.registerCompletionItemProvider(
    "python",
    {
      provideCompletionItems(document, position) {
        return snippetsHandler(document, position);
      },
    },
    ".", // trigger on dot
    ...Array.from("abcdefghijklmnopqrstuvwxyz") // trigger on letters
  );

  context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = { activate, deactivate };

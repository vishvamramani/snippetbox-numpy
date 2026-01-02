NumPy SnippetBox 🚀

Smart, ultra-fast NumPy autocomplete and snippets for Python in VS Code.
Automatically detects your NumPy import alias (np, numpy, or custom) and provides context-aware suggestions without slowing down the editor.

📦 Features

🔍 Automatic NumPy alias detection (np, numpy, or custom)

⚡ Ultra-fast method suggestions

🧠 Smart filtering while typing (np.z → zeros)

❌ No suggestions inside import statements

🧩 Works efficiently with large Python files

🚫 Zero editor slowdown

📖 Usage

Import NumPy in your Python file:

import numpy as np


or

import numpy as numpy_lib


Start typing a NumPy method:

np.a


Instantly get relevant suggestions:

np.array()
np.arange()


The extension automatically adapts to the alias you are using.

🧠 Technical Overview

Alias Detection: Uses AST (Abstract Syntax Tree) parsing for accurate detection of NumPy imports and aliases.

Fallback Mechanism: Lightweight, scoped regex scanning for rapid typing or partial imports.

Performance Optimizations: Debounced analysis, per-document caching, runs only for Python files, and non-blocking execution to ensure smooth editor performance.

Snippet Resolution: Only triggers after a valid NumPy alias; dynamically adapts to alias changes.

👨‍💻 Developer Information

Extension Name: snippetbox-numpy

Display Name: NumPy SnippetBox

Extension ID: snippetbox-numpy

Language Support: Python

Developed & Managed By: Vishvam Ramani

GitHub: https://github.com/vishvamramani/snippetbox-numpy

🌐 Open Source

NumPy SnippetBox is open source under the MIT License.
Contributions, feature requests, and issues are welcome!

License: MIT License


⚡ Performance & Compatibility

✅ Python files (.py) only

✅ Large codebases

✅ Multi-root workspaces

❌ No configuration required

🛠 Troubleshooting

Ensure NumPy is imported in the file

Start typing using the detected alias (e.g., np.)

Cursor should not be inside an import statement

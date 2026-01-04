
# NumPy SnippetBox

Smart, ultra-fast NumPy snippets for Python. Automatically detects your NumPy alias (np, numpy, or custom) and provides accurate, context-aware suggestions without slowing down VS Code.

⚡ Short & Punchy

Ultra-fast NumPy snippets for Python with automatic alias detection. Works instantly with np, numpy, or any custom alias.

🧠 Technical

A lightweight VS Code extension that uses AST-based analysis to detect NumPy imports and deliver real-time, alias-aware snippets with zero editor lag.

🚀 Marketing Style

Boost your Python productivity with smart NumPy snippets. Alias-aware, fast, and optimized for large files—no configuration required.





## Documentation

NumPy SnippetBox is a high-performance VS Code extension for Python that delivers intelligent, alias-aware NumPy autocomplete and snippets.
The extension automatically detects NumPy import aliases using AST parsing with a regex-based fallback, ensuring accuracy without impacting editor performance.

This document describes the internal architecture, detection logic, and performance considerations for developers maintaining or extending the extension.

---
Core Design Goals

 - ⚡ Ultra-fast autocomplete and snippet suggestions

 - 🎯 Accurate NumPy alias detection

 - 🧠 Zero false positives from comments or strings

 - 🚫 No performance degradation in VS Code

 - 🧩 Scalable for large Python files and workspaces

```
import numpy as np
import numpy
import numpy as numpy_lib
from numpy import array
from numpy import zeros as z

 ```

 Alias Detection Architecture
1. AST-Based Analysis (Primary Mechanism)
* Python source files are parsed into an Abstract Syntax Tree (AST).
* The extension traverses only relevant nodes:

* ``` Import ```

* ``` ImportFrom ```

* This approach allows the extension to:

* Reliably detect NumPy imports

* Extract alias names (np, numpy, custom aliases)

* Ignore comments, strings, and unrelated code

Why AST?
* AST parsing provides syntax-level accuracy and eliminates false positives common in text-based scanning.

---

2. Regex-Based Detection (Fallback)

* A lightweight, precompiled regex is used as a fallback mechanism.

* Regex execution is:

    - Scoped strictly to import lines

    - Triggered only during rapid typing or partial document states

* Ensures real-time responsiveness when AST parsing is temporarily deferred.

This hybrid model balances correctness and speed.

### Snippet Resolution Logic

* Snippets are triggered only after a detected NumPy alias

* Suggestions are suppressed inside import statements

* Snippet prefixes are dynamically rewritten using the detected alias

Example:

```
np.z  →  np.zeros()

```


## 📦 Extension Information
- Extension Name: ```snippetbox-numpy```

- Display Name:``` NumPy SnippetBox ```

- Extension ID: ```snippetbox-numpy```

- Language Support: ```Python```

- Platform: ```Visual Studio Code```

## 🌐 Open Source

NumPy SnippetBox is fully open source and available under the MIT License.
You are welcome to:

- Inspect the source code

- Contribute features or bug fixes

- Fork the project for personal use

- Submit issues or feature requests


GitHub Repository: https://github.com/vishvamramani/snippetbox-numpy

## About the Developer
Vishvam Ramani is a software developer focused on building high-performance, developer-friendly VS Code extensions for Python and productivity tools. His work emphasizes:

* ⚡ Speed and real-time performance

* 🧠 Intelligent code analysis using AST and Regex

* 🧩 Scalability for large codebases

* 📦 Maintainability and clean architecture

#### Contributions & Support:
* Issues, feature requests, and pull requests are welcome.

* Codebase follows modular design for easy extensions and long-term maintenance.

Developed & Managed By: Vishvam Ramani 
 
GitHub: [Vishvam Ramani](https://github.com/vishvamramani)

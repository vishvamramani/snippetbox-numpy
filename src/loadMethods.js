const fs = require("fs");
const path = require("path");

let numpyMethods = null;

/**
 * Load NumPy methods JSON (flat list, no categories)
 * Caches in memory for fast access
 */
function loadNumpyMethods() {
  if (numpyMethods) return numpyMethods; // return cached copy

  const jsonPath = path.join(__dirname, "extension.json"); // your JSON file
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

module.exports = {
  loadNumpyMethods
};

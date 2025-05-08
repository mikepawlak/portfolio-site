const fs = require('fs');
const path = require('path');

function loadJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

// adjust this path if you write your JSON somewhere else
const resultsFile = path.join(__dirname, '..', 'coverage', 'e2e-results.json');

const data = loadJson(resultsFile);

// guard
if (!data || !data.stats) {
  console.error(`❌ Could not load stats from ${resultsFile}`);
  process.exit(1);
}

const { expected, skipped, unexpected, flaky, duration } = data.stats;

// build markdown
const md = `
| 📊 Metric                  | 🔢 Value      |
| -------------------------- | ------------: |
| ✅ Tests Expected (passed) | ${expected}      |
| ❌ Unexpected Failures     | ${unexpected}   |
| 🤷‍♂️ Skipped               | ${skipped}       |
| 🔄 Flaky                   | ${flaky}        |
| ⏱️ Total Duration (ms)     | ${Math.round(duration)} |
`.trim();

console.log(md);

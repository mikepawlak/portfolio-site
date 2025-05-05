// scripts/pr-comment.js
const fs = require('fs');
const path = require('path');

// helper to load JSON or return null
function loadJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

const testResultsFile = path.join(
  __dirname,
  '..',
  'coverage',
  'test-results.json'
);
const covSummaryFile = path.join(
  __dirname,
  '..',
  'coverage',
  'coverage-summary.json'
);

const tests = loadJson(testResultsFile);
const summary = tests?.summary;
const cov = loadJson(covSummaryFile);

// extract test counts (defaulting to 0)
const passed = summary?.success ?? 0;
const failed = summary?.failed ?? 0;
const skipped = summary?.skipped ?? 0;
const total = passed + failed + skipped;

// extract coverage percentages
const stmtPct = cov?.total?.statements?.pct ?? 0;
const brncPct = cov?.total?.branches?.pct ?? 0;
const funcPct = cov?.total?.functions?.pct ?? 0;
const linePct = cov?.total?.lines?.pct ?? 0;

// build the markdown
const md = `
| 📊 Metric              | 🔢 Value         |
| ---------------------- | ---------------: |
| ✅ Tests Passed        | ${passed}/${total}       |
| ❌ Tests Failed        | ${failed}           |
| 🤷‍♂️ Tests Skipped      | ${skipped}           |
| 📑 Statements Coverage | ${stmtPct}%          |
| 🌿 Branches Coverage   | ${brncPct}%          |
| 🔧 Functions Coverage  | ${funcPct}%          |
| 📋 Lines Coverage      | ${linePct}%          |
`.trim();

console.log(md);

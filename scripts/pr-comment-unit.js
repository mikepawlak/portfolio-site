const fs = require('fs');
const path = require('path');

function loadJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function generateMarkdown(title, testResults, coverage) {
  const summary = testResults?.summary ?? {};
  const passed = summary.success ?? 0;
  const failed = summary.failed ?? 0;
  const skipped = summary.skipped ?? 0;
  const total = passed + failed + skipped;

  const cov = coverage?.total ?? {};
  const stmtPct = cov.statements?.pct ?? 0;
  const brncPct = cov.branches?.pct ?? 0;
  const funcPct = cov.functions?.pct ?? 0;
  const linePct = cov.lines?.pct ?? 0;

  return `
### ${title}

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
}

// Load test results and coverage files
const webTestResults = loadJson('coverage/web-test-results.json');
const webCoverage = loadJson('coverage/coverage-final.json');

const fnTestResults = loadJson('coverage/functions-test-results.json');
const fnCoverage = loadJson('coverage/functions-coverage-final.json');

const webTable = generateMarkdown('🖥️ Web App', webTestResults, webCoverage);
const fnTable = generateMarkdown(
  '☁️ Cloud Functions',
  fnTestResults,
  fnCoverage
);

// Combine the output with a divider
console.log(`${webTable}\n\n---\n\n${fnTable}`);

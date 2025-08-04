const fs = require('fs');
const path = require('path');

function loadJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function renderTable(title, testResults, coverage) {
  const passed = testResults?.summary?.success ?? 0;
  const failed = testResults?.summary?.failed ?? 0;
  const skipped = testResults?.summary?.skipped ?? 0;
  const total = passed + failed + skipped;

  const stmtPct = coverage?.total?.statements?.pct ?? 0;
  const brncPct = coverage?.total?.branches?.pct ?? 0;
  const funcPct = coverage?.total?.functions?.pct ?? 0;
  const linePct = coverage?.total?.lines?.pct ?? 0;

  return `
    <td valign="top">
      <h3>${title}</h3>
      <table>
        <thead>
          <tr><th>📊 Metric</th><th>🔢 Value</th></tr>
        </thead>
        <tbody>
          <tr><td>✅ Tests Passed</td><td>${passed}/${total}</td></tr>
          <tr><td>❌ Tests Failed</td><td>${failed}</td></tr>
          <tr><td>🤷‍♂️ Tests Skipped</td><td>${skipped}</td></tr>
          <tr><td>📑 Statements Coverage</td><td>${stmtPct}%</td></tr>
          <tr><td>🌿 Branches Coverage</td><td>${brncPct}%</td></tr>
          <tr><td>🔧 Functions Coverage</td><td>${funcPct}%</td></tr>
          <tr><td>📋 Lines Coverage</td><td>${linePct}%</td></tr>
        </tbody>
      </table>
    </td>
  `;
}

// Load data from root-level coverage folder
const webTests = loadJson(
  path.join(__dirname, '..', 'coverage', 'web-test-results.json')
);
const webCoverage = loadJson(
  path.join(__dirname, '..', 'coverage', 'coverage-final.json')
);

const funcTests = loadJson(
  path.join(__dirname, '..', 'coverage', 'test-results.json')
);
const funcCoverage = loadJson(
  path.join(__dirname, '..', 'coverage', 'coverage-summary.json')
);

const webTable = renderTable('🖥️ Web App', webTests, webCoverage);
const funcTable = renderTable('☁️ Cloud Functions', funcTests, funcCoverage);

const comment = `
<table>
  <tr>
    ${webTable}
    ${funcTable}
  </tr>
</table>
`.trim();

console.log(comment);

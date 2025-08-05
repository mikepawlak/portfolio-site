const fs = require('fs');
const path = require('path');

function loadJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function calculateTotalsFromJestCoverage(coverageMap) {
  const total = {
    statements: { covered: 0, total: 0 },
    branches: { covered: 0, total: 0 },
    functions: { covered: 0, total: 0 },
    lines: { covered: 0, total: 0 },
  };

  for (const file of Object.values(coverageMap)) {
    if (file.s) {
      total.statements.total += Object.keys(file.s).length;
      total.statements.covered += Object.values(file.s).filter(
        v => v > 0
      ).length;

      // Lines are estimated from statements
      total.lines.total += Object.keys(file.s).length;
      total.lines.covered += Object.values(file.s).filter(v => v > 0).length;
    }

    if (file.b) {
      const branches = Object.values(file.b).flat();
      total.branches.total += branches.length;
      total.branches.covered += branches.filter(v => v > 0).length;
    }

    if (file.f) {
      total.functions.total += Object.keys(file.f).length;
      total.functions.covered += Object.values(file.f).filter(
        v => v > 0
      ).length;
    }
  }

  const pct = cov =>
    cov.total > 0 ? Math.round((cov.covered / cov.total) * 100) : 0;

  return {
    total: {
      statements: { pct: pct(total.statements) },
      branches: { pct: pct(total.branches) },
      functions: { pct: pct(total.functions) },
      lines: { pct: pct(total.lines) },
    },
  };
}

function generateMarkdown(title, testResults, coverageRaw) {
  let passed = 0,
    failed = 0,
    skipped = 0;

  if (testResults?.summary) {
    // Karma-style
    passed = testResults.summary.success ?? 0;
    failed = testResults.summary.failed ?? 0;
    skipped = testResults.summary.skipped ?? 0;
  } else if (
    typeof testResults?.numPassedTests === 'number' &&
    typeof testResults?.numFailedTests === 'number'
  ) {
    // Jest-style
    passed = testResults.numPassedTests;
    failed = testResults.numFailedTests;
    skipped = testResults.numPendingTests ?? 0;
  }

  const total = passed + failed + skipped;

  const coverage = calculateTotalsFromJestCoverage(coverageRaw ?? {});
  const cov = coverage.total;
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
const webCoverageRaw = loadJson('coverage/web/coverage-final.json');
const fnTestResults = loadJson('coverage/functions-test-results.json');
const fnCoverageRaw = loadJson('coverage/functions/coverage-final.json');

// Generate markdown tables
const webTable = generateMarkdown('🖥️ Web App', webTestResults, webCoverageRaw);
const fnTable = generateMarkdown(
  '☁️ Cloud Functions',
  fnTestResults,
  fnCoverageRaw
);

// Output combined
console.log(`${webTable}\n\n---\n\n${fnTable}`);

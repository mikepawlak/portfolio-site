const fs = require('fs');
const path = require('path');

function loadJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function generateSection(title, testSummary, coverage) {
  const passed = testSummary?.success ?? 0;
  const failed = testSummary?.failed ?? 0;
  const skipped = testSummary?.skipped ?? 0;
  const total = passed + failed + skipped;

  const stmtPct = coverage?.total?.statements?.pct ?? 0;
  const brncPct = coverage?.total?.branches?.pct ?? 0;
  const funcPct = coverage?.total?.functions?.pct ?? 0;
  const linePct = coverage?.total?.lines?.pct ?? 0;

  return `
### 🧪 ${title}

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

// Load test and coverage files
const root = path.join(__dirname, '..', 'coverage');

const reportSets = [
  {
    label: 'Web App',
    testFile: 'web-test-results.json',
    covFile: 'web-coverage-summary.json',
  },
  {
    label: 'Cloud Functions',
    testFile: 'functions-test-results.json',
    covFile: 'functions-coverage-summary.json',
  },
];

const sections = reportSets.map(({ label, testFile, covFile }) => {
  const testSummary = loadJson(path.join(root, testFile))?.summary ?? null;
  const coverage = loadJson(path.join(root, covFile));
  return generateSection(label, testSummary, coverage);
});

const finalOutput = sections.join('\n\n');
console.log(finalOutput);

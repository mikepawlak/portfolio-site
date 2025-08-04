const fs = require('fs');
const path = require('path');

function loadJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function buildMarkdownSection(title, testFile, covFile) {
  const tests = loadJson(testFile);
  const cov = loadJson(covFile);

  const passed = tests?.summary?.success ?? 0;
  const failed = tests?.summary?.failed ?? 0;
  const skipped = tests?.summary?.skipped ?? 0;
  const total = passed + failed + skipped;

  const stmtPct = cov?.total?.statements?.pct ?? 0;
  const brncPct = cov?.total?.branches?.pct ?? 0;
  const funcPct = cov?.total?.functions?.pct ?? 0;
  const linePct = cov?.total?.lines?.pct ?? 0;

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

// File locations (already in root /coverage dir)
const webTestsFile = path.join(
  __dirname,
  '..',
  'coverage',
  'web-test-results.json'
);
const webCovFile = path.join(
  __dirname,
  '..',
  'coverage',
  'coverage-final.json'
); // web overwrites this

const fnTestsFile = path.join(__dirname, '..', 'coverage', 'test-results.json');
const fnCovFile = path.join(
  __dirname,
  '..',
  'coverage',
  'functions-coverage.json'
);

// Build both sections
const webTable = buildMarkdownSection('Web App', webTestsFile, webCovFile);
const fnTable = buildMarkdownSection('Cloud Functions', fnTestsFile, fnCovFile);

// Print side-by-side using two Markdown tables in one row
const combined = `
| ${webTable.replace(/\n/g, '<br>')} | ${fnTable.replace(/\n/g, '<br>')} |
| --- | --- |
`;

console.log(combined);

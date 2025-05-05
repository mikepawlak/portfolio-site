// Generate a Markdown comment for PRs based on test-results.json & coverage-summary.json

const fs = require('fs');
const path = require('path');

function safeReadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function buildTable(tests, cov) {
  if (!tests || !tests.summary || !cov || !cov.total) {
    return `| ⚠️ Could not read test results or coverage files |`;
  }

  const { total, success: passed, failed } = tests.summary;
  const { statements, branches, functions, lines } = cov.total;

  return [
    '| 📊 Metric              | 🔢 Value       |',
    '| ---------------------- | ------------: |',
    `| ✅ Tests Passed        | ${passed}/${total} |`,
    `| ❌ Tests Failed        | ${failed}         |`,
    `| 📑 Statements Coverage | ${statements.pct}%        |`,
    `| 🌿 Branches Coverage   | ${branches.pct}%        |`,
    `| 🔧 Functions Coverage  | ${functions.pct}%        |`,
    `| 📋 Lines Coverage      | ${lines.pct}%        |`,
  ].join('\n');
}

function main() {
  const base = path.resolve(__dirname, '..', 'coverage');
  const testFile = path.join(base, 'test-results.json');
  const covFile = path.join(base, 'coverage-summary.json');

  const tests = safeReadJson(testFile);
  const cov = safeReadJson(covFile);
  const table = buildTable(tests, cov);

  console.log('## 🛠️ CI Test & Coverage Report\n');
  console.log(table);
}

main();

const fs = require('fs');
const path = require('path');

function loadJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

const resultsFile = path.join(__dirname, '..', 'coverage', 'e2e-results.json');
const data = loadJson(resultsFile);

if (!data || !data.suites || !Array.isArray(data.suites)) {
  console.error(
    `❌ Could not load valid Playwright results from ${resultsFile}`
  );
  process.exit(1);
}

const browsers = {}; // { [browserName]: { passed, failed, skipped, flaky, duration } }

for (const suite of data.suites) {
  for (const spec of suite.specs) {
    for (const test of spec.tests) {
      const browser = test.projectName;
      if (!browsers[browser]) {
        browsers[browser] = {
          passed: 0,
          failed: 0,
          skipped: 0,
          flaky: 0,
          duration: 0,
        };
      }

      for (const result of test.results) {
        const status = result.status;
        const stats = browsers[browser];

        if (status === 'passed') stats.passed += 1;
        else if (status === 'failed') stats.failed += 1;
        else if (status === 'skipped') stats.skipped += 1;

        // You could enhance flaky detection here if needed
        stats.duration += result.duration ?? 0;
      }
    }
  }
}

// Build markdown table
const allBrowsers = Object.keys(browsers);
const total = { passed: 0, failed: 0, skipped: 0, flaky: 0, duration: 0 };

// Sum totals
for (const stats of Object.values(browsers)) {
  total.passed += stats.passed;
  total.failed += stats.failed;
  total.skipped += stats.skipped;
  total.flaky += stats.flaky;
  total.duration += stats.duration;
}

const rows = [
  ['✅ Passed', 'passed'],
  ['❌ Unexpected Failures', 'failed'],
  ['🤷‍♂️ Skipped', 'skipped'],
  ['🔄 Flaky', 'flaky'],
  ['⏱️ Duration (ms)', 'duration'],
];

let md = `### 🧪 E2E Tests\n\n| 📊 Metric | ${allBrowsers.map(b => capitalize(b)).join(' | ')} | Total |\n| --------- | ${allBrowsers.map(() => '------:').join(' | ')} | -----: |`;

for (const [label, key] of rows) {
  const values = allBrowsers.map(b => browsers[b][key]);
  const totalVal = total[key];
  md += `\n| ${label} | ${values.join(' | ')} | ${totalVal} |`;
}

console.log(md);

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

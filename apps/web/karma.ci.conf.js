// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter'),
      require('karma-json-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],

    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
    },

    jasmineHtmlReporter: {
      suppressAll: true,
    },

    // ── HERE ── make sure both coverage & json reporters are enabled ──
    reporters: [
      'spec', // nice console output
      'coverage', // emits JSON summary + lcov
      'json', // emits test-results.json
    ],

    // ←— configure the JSON reporter to write to a file
    jsonReporter: {
      stdout: false, // don’t dump to console
      outputFile: './coverage/test-results.json',
    },

    // ←— configure the coverage reporter to emit a JSON-summary
    coverageReporter: {
      dir: path.join(__dirname, './coverage/'),
      subdir: '.',
      reporters: [
        // JSON summary for `jq` parsing
        { type: 'json-summary', subdir: '.', file: 'coverage-summary.json' },
        // (optional) an lcov report for uploading to Codecov/etc.
        { type: 'lcov', subdir: '.' },
      ],
    },

    browsers: ['ChromeHeadless'],

    singleRun: true, // exit after first run (CI mode)
    restartOnFileChange: false, // no watching in CI
  });
};

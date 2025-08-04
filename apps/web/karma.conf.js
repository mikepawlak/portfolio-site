// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: 'apps/web',
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
      jasmine: {},
      clearContext: false,
    },
    jasmineHtmlReporter: {
      suppressAll: true,
    },

    reporters: ['spec', 'coverage', 'json'],
    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true,
    },

    coverageReporter: {
      dir: require('path').join(__dirname, '../../coverage/'),
      reporters: [
        { type: 'json', subdir: '.', file: 'coverage-final.json' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
        { type: 'text-summary' },
      ],
    },

    jsonReporter: {
      stdout: false,
      outputFile: require('path').join(
        __dirname,
        '../../coverage/web-test-results.json'
      ),
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    restartOnFileChange: true,
  });
};

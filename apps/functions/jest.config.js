module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageDirectory: '../../coverage/functions',
  coverageReporters: ['json', 'lcov', 'text-summary'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/__mocks__/**',
    '!src/**/index.ts',
  ],
};

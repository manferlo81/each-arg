const threshold = 95

module.exports = {

  testEnvironment: 'node',
  browser: false,

  cacheDirectory: 'node_modules/.cache/jest',

  preset: 'ts-jest',

  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [
    process.env.CI ? 'json' : 'lcov',
    'text',
    'text-summary',
  ],
  coverageThreshold: {
    global: {
      branches: threshold,
      functions: threshold,
      lines: threshold,
      statements: threshold,
    },
  },

  verbose: true,

}

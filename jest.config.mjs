const threshold = 95;

/** @type { import("jest").Config } */
const config = {
  cacheDirectory: 'node_modules/.cache/jest',
  preset: 'ts-jest',

  collectCoverage: !process.env.SKIP_COVERAGE,
  coverageDirectory: 'coverage',
  coverageReporters: process.env.CI
    ? ['json', 'clover', 'cobertura']
    : ['html', 'text'],
  coverageThreshold: {
    global: {
      branches: threshold,
      functions: threshold,
      lines: threshold,
      statements: threshold,
    },
  },

  testMatch: [
    '**/__test__/*.test.ts',
  ],

  verbose: true,
};

export default config;

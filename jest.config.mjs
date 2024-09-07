const threshold = 95;

/** @type { import("jest").Config } */
const config = {
  cacheDirectory: 'node_modules/.cache/jest',
  preset: 'ts-jest',

  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [
    process.env.CI ? 'json' : 'html',
    'text',
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
};

export default config;

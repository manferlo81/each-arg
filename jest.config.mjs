import { createDefaultPreset } from 'ts-jest';

const collectCoverage = !process.env.SKIP_COVERAGE;
const runningOnCI = process.env.CI;

const threshold = 95;

const typescriptJestPreset = createDefaultPreset({
  tsconfig: './tsconfig.json',
});

/** @type { import("ts-jest").JestConfigWithTsJest } */
const config = {
  ...typescriptJestPreset,

  collectCoverage,
  coverageDirectory: 'coverage',
  coverageReporters: runningOnCI
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

  cacheDirectory: 'node_modules/.cache/jest',
  verbose: true,
};

export default config;

const { main } = require("./package.json");

const CI = process.env.CI;
const threshold = 99;

module.exports = {

  testEnvironment: "node",
  browser: false,

  cacheDirectory: ".cache/jest",

  collectCoverage: true,
  collectCoverageFrom: [
    main,
  ],
  coverageDirectory: "coverage",
  coverageReporters: [
    CI ? "json" : "lcov",
    "text",
    "text-summary",
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

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.(unit).[jt]s?(x)",
    "**/?(*.)+(unit).[jt]s?(x)",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/*.config.{js,ts}",
    "!**/__tests__/**",
    "!jest.integrationConfig.js"
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["clover", "html", "json", "lcov", "text"],
  coverageThreshold: {
    global: {
      branches: 63.01,
      functions: 74.68,
      lines: 83.2,
      statements: 82.5
    }
  },
  verbose: true,
};

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
  /* coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: -10
    }
  },*/
  verbose: true,
};

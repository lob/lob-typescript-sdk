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
      branches: 70.84,
      functions: 76.61,
      lines: 84.12,
      statements: 83.59
    }
  },
  verbose: true,
};

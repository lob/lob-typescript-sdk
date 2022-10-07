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
    "!models/**",
    "!**/node_modules/**",
    "!**/*.config.{js,ts}",
    "!**/build/**",
    "!**/dist/**",
    "!**/__tests__/**",
    "!jest.integrationConfig.js",
    "!**/actions/monitoring/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["clover", "html", "json", "lcov", "text"],
  verbose: true,
};

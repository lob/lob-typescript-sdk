/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/_tests_/**/*.(spec).[jt]s?(x)",
    "**/__tests__/**/*.(spec).[jt]s?(x)",
    "**/?(*.)+(spec).[jt]s?(x)",
  ],
  verbose: true,
};

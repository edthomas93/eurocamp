const COVERAGE_LEVEL = 100;

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  coverageDirectory: "<rootDir>/coverage",
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: COVERAGE_LEVEL,
      functions: COVERAGE_LEVEL,
      lines: COVERAGE_LEVEL,
      statements: COVERAGE_LEVEL,
    },
  },
};

export default {
  testRegex: '.*\\..*(spec|test)\\.ts$',
  modulePaths: ['<rootDir>'],
  testTimeout: 1000 * 1000,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts}'],
  testPathIgnorePatterns: [],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@test/(.+)': '<rootDir>/test/$1',
    '@src/(.+)': '<rootDir>/src/$1',
    '@common/(.+)': ['<rootDir>/src/common/$1'],
    '@events/(.+)': ['<rootDir>/src/events/$1'],
  },
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 90,
      functions: 90,
      lines: 90,
    },
  },
};

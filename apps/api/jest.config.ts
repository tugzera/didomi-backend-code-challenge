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
    '@shared/(.+)': ['<rootDir>/src/shared/$1'],
    '@account/(.+)': ['<rootDir>/src/account/$1'],
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

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
    '@users/(.+)': ['<rootDir>/src/users/$1'],
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/main.ts',
    '<rootDir>/src/common/infra/database/migrations/*',
    '<rootDir>/src/common/infra/database/typeorm-database-connection.adapter.ts',
    '<rootDir>/src/users/domain/repositories/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 100,
      functions: 100,
      lines: 100,
    },
  },
};

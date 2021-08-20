module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/test', '<rootDir>/src'],
  testMatch: ['**/test/**/*.(ts|tsx|js|jsx)', '**/*.(spec|test).(ts|tsx|js|jsx)'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  collectCoverage: false,
  collectCoverageFrom: ['!**/index.ts', '!**/types/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  verbose: true,
}

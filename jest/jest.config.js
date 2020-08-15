module.exports = {
  rootDir: '..',
  setupFilesAfterEnv: ['./jest/jest.setup.js'],
  setupFiles: ['./jest/jest.test-env.js'],
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  moduleDirectories: [
    'node_modules',
    'src/js',
  ],
  testMatch: [
    '**/src/**/?(*.)test.js?(x)',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/js/**/*.{jsx,js}',
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
};

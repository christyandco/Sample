// Issues with latest version (7.0.1) of react-markdown. Hence using v6.0.3. References...
// https://githubmemory.com/repo/remarkjs/react-markdown/issues/635
// https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
const { defaults } = require('jest-config');
module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/components$1',
    '^@pages(.*)$': '<rootDir>/pages$1',
    '^@hooks(.*)$': '<rootDir>/hooks$1',
    '^@context(.*)$': '<rootDir>/context$1',
    '^@services(.*)$': '<rootDir>/services$1',
    '\\.(css|less|sass|scss)$': '<rootDir>/tests/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'components/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'hooks/*.{ts,tsx}',
    'pages/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}',
    'services/*.{ts,tsx}',
    'services/**/*.{ts,tsx}',
    'context/*.{ts,tsx}',
    '!**/_app.tsx',
    '!pages/csa/index.tsx',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/tests/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!**/.storybook/**',
    '!**/cypress/**',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  coverageDirectory: './coverage',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
      },
    ],
  ],
};

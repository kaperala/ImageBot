import type { Config } from 'jest';

const config: Config = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};

export default config;

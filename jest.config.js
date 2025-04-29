/* eslint-disable @typescript-eslint/no-require-imports */
// jest.config.js
const nextJest = require( 'next/jest' );

const createJestConfig = nextJest( {
  dir: './',
} );

const customJestConfig = {
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/state/(.*)$': '<rootDir>/src/state/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/fonts/(.*)$': '<rootDir>/src/fonts/$1',
    '^@/theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/mocks/(.*)$': '<rootDir>/src/mocks/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

// Define esModules if you're using it
const esModules = []; // add module names here if needed

module.exports = async () => {
  const config = await createJestConfig( customJestConfig )();
  return {
    ...config,
    transformIgnorePatterns: esModules.length
      ? [`<rootDir>/node_modules/(?!${ esModules.join( '|' ) })`]
      : [],
  };
};

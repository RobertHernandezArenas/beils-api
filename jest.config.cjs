/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/api'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/api/$1',
		'^@components/(.*)$': '<rootDir>/api/components/$1',
		'^@config/(.*)$': '<rootDir>/api/config/$1',
		'^@orm/(.*)$': '<rootDir>/api/config/database/orm/$1',
		'^@router/(.*)$': '<rootDir>/api/router/$1',
	},
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
	},
	extensionsToTreatAsEsm: ['.ts'],
};

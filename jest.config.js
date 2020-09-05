// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

'use strict';

const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';

module.exports = {
	setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
	testRegex: TEST_REGEX,
	transform: {
		'^.+\\.tsx?$': 'babel-jest',
	},
	testPathIgnorePatterns: [
		'<rootDir>/.next/',
		'<rootDir>/node_modules/',
		'<rootDir>/cypress/',
	],
	moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js'],
	collectCoverage: false,
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/fileMock.js',
		'\\.(css|less)$': 'identity-obj-proxy',
	},
};

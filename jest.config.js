/** @type {import('jest').Config} */
const config = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(ts|tsx)?$": [
			"ts-jest",
			{
				useESM: true,
				tsconfig: "tsconfig.json"
			}
		],
		"^.+\\.jsx?$": "babel-jest"
	},
	displayName: "tailwind-inject-plugin",
	testMatch: ["<rootDir>/__tests__/**/*.test.{ts,tsx}"],
	moduleNameMapper: {
		"^@/tests/(.*)$": "<rootDir>/__tests__/$1",
		"^@/(.*)$": "<rootDir>/src/$1",
	}
};

export default config;

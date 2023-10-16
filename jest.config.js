export default {
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    },
    testMatch: ['**/*.test.jsx'],
    moduleNameMapper: {
        '\\.(scss|less)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/__mocks__/fileMock.cjs',
    },
    testEnvironment: "jsdom",
    // important to expose all the jest-dom api globally in each test
    setupFilesAfterEnv: ["@testing-library/jest-dom/"]
};
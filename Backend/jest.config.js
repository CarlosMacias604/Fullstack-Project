module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/'],
    testMatch: ['**/*.test.js'],
    collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js', '!src/server.js'],
    verbose: true
};

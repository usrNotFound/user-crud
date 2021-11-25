module.exports = {
    setupFiles : ['./setupTest.js'],
    testEnvironment : 'jsdom',
    collectCoverageFrom : ['resources/**/*.{js,jsx}'],
    setupFilesAfterEnv : ["@testing-library/jest-dom"],
};

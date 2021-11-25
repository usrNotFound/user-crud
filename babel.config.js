module.exports = api => {
    const isTest = api.env('test');
    if (isTest) {
        return {
            presets: [
                '@babel/preset-env',
                '@babel/preset-react',
            ],
            plugins: [
                '@babel/plugin-transform-runtime'
            ]
        };
    }

    return {
        plugins: ['@babel/plugin-proposal-optional-chaining']
    };
};

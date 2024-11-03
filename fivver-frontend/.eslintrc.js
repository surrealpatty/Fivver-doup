module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        // your custom rules
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                // Add any specific rules for .vue files here
            }
        }
    ],
};

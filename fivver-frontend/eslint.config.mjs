import globals from 'globals';

export default {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended', // Adjust this if you're using a different version of Vue
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        // Add your custom rules here
    },
    globals: {
        ...globals,
    },
};

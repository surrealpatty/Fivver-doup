module.exports = {
    // Other configurations
  // Remove the extensions property if it exists
  // extensions: ["js", "vue"], // Remove or comment this line
  // Add other relevant configurations
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
        'no-console': 'warn',
        'semi': ['error', 'always'],
    },
    overrides: [
        {
            files: ['*.vue', '*.js'], // Specify both .vue and .js files
            rules: {
                'vue/no-unused-components': 'warn',
                'vue/script-setup-uses-vars': 'error',
            }
        }
    ],
};

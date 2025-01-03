module.exports = {
  presets: [
    '@babel/preset-env',                // Transpile modern JavaScript syntax to compatible code
    '@babel/preset-typescript',         // Support for TypeScript
    '@babel/preset-react',              // If using React, this is necessary for JSX support (optional)
  ],
  plugins: [
    '@babel/plugin-transform-runtime',  // For efficient runtime helpers (e.g., async/await)
    [
      '@babel/plugin-proposal-decorators', // Support for decorator syntax
      {
        version: '2021-12',               // Ensure the latest version of decorators is supported
        decoratorsBeforeExport: true      // Ensure decorators are before export statements
      }
    ],
    '@babel/plugin-proposal-class-properties',  // Support for class properties (e.g., public/private)
    'babel-plugin-transform-es2015-modules-commonjs', // Convert ES Modules to CommonJS for compatibility
  ],
  overrides: [
    {
      test: /\.ts$/,  // Apply additional plugins for TypeScript files
      plugins: [
        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }]  // Ensure decorators are applied to TypeScript files as well
      ]
    }
  ]
};

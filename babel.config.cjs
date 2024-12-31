module.exports = {
  presets: [
    '@babel/preset-env',               // Transpile modern JavaScript syntax
    '@babel/preset-typescript',        // Support for TypeScript
    '@babel/preset-react',             // If using React, add JSX support (optional)
  ],
  plugins: [
    '@babel/plugin-transform-runtime',  // For efficient runtime helpers
    [
      '@babel/plugin-proposal-decorators', // Allow decorator syntax
      {
        version: '2021-12',                  // Ensure the latest decorators version is used
        decoratorsBeforeExport: true         // Ensure decorators are before exports
      }
    ],
    '@babel/plugin-proposal-class-properties',  // Support for class properties
    'babel-plugin-transform-es2015-modules-commonjs', // For converting ES Modules to CommonJS
  ],
  overrides: [
    {
      test: /\.ts$/,  // Apply additional plugins for TypeScript files
      plugins: [
        '@babel/plugin-proposal-decorators'  // Ensure decorators are applied to TypeScript files as well
      ]
    }
  ],
};

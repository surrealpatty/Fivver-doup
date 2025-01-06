module.exports = {
  presets: [
    '@babel/preset-env',               // Transpile modern JavaScript to compatible code
    '@babel/preset-typescript',        // Support for TypeScript
    '@babel/preset-react',             // Optional, if you're using React and JSX
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // Optimize the use of helpers like async/await
    [
      '@babel/plugin-proposal-decorators',  // Support for decorators
      {
        version: '2021-12',                 // Latest decorator version
        decoratorsBeforeExport: true        // Place decorators before export statements
      }
    ],
    '@babel/plugin-proposal-class-properties',  // Support for class properties (e.g., public/private fields)
    '@babel/plugin-transform-modules-commonjs'  // Convert ES modules to CommonJS for compatibility
  ],
  overrides: [
    {
      test: /\.ts$/,  // Apply additional settings to TypeScript files
      plugins: [
        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }]  // Ensure decorators are applied to TypeScript files as well
      ]
    }
  ]
};

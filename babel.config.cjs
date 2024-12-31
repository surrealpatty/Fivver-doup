// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react' // if you're using React
  ],
  plugins: [
    '@babel/plugin-proposal-decorators', // Allow decorator syntax
    '@babel/plugin-proposal-class-properties' // Support for class properties (if you use them)
  ],
  overrides: [
    {
      test: /\.ts$/,
      plugins: ['@babel/plugin-proposal-decorators']
    }
  ]
};

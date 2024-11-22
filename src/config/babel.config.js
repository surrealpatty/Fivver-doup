module.exports = {
  presets: [
    '@babel/preset-env',        // Transpile modern JavaScript
    '@babel/preset-react',      // Support JSX/React syntax
    '@babel/preset-typescript', // Support TypeScript
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties', // Support class properties syntax
    '@babel/plugin-proposal-private-methods',  // Support private methods in classes
    '@babel/plugin-transform-runtime',         // Helps with async/await support
  ],
};

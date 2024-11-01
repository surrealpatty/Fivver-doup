module.exports = {
    presets: [
      '@babel/preset-env', // Preset for compiling ES6+ down to ES5
      // Uncomment the line below if you are using TypeScript
      // '@babel/preset-typescript', // Preset for compiling TypeScript
      // Uncomment the line below if you are using JSX with Vue 3
      // '@vue/babel-preset-jsx' // Preset for compiling JSX in Vue 3
    ],
    // If you need to customize Babel plugins, you can do so here
    // plugins: [
    //   // Add any necessary plugins here
    // ],
  };
  module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript', // Uncomment if using TypeScript
      '@vue/babel-preset-jsx'      // Uncomment if using JSX
    ],
  };
    
module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',  // Transforms JavaScript and TypeScript files
    '^.+\\.vue$': 'vue-jest'  // Add this line to process .vue files
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],  // Add 'vue' here
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Adjust this if your paths need mapping
  },
  roots: ['<rootDir>/src'],  // Set Jest to look in the src folder
};

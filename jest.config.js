module.exports = {
    transform: {
      "^.+\\.vue$": "@vue/vue3-jest", // Make sure this is set
      "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "json",
      "vue", // Include vue here
    ],
  };
  
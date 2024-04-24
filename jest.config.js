module.exports = {
  // Indicates that the root of the project is in the current directory
  roots: ["<rootDir>/src"],

  // Use TypeScript for preprocessing
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Test environment options
  testEnvironment: "node",

  // Module file extensions
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default {
  roots: ["<rootDir>/src/"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

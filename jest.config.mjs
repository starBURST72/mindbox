export default {
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.tsx", "**/?(*.)+(spec|test).tsx"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: [
    "./node_modules/@testing-library/jest-dom/dist/index.js" // Полный путь
  ],
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: {
        jsx: "react-jsx",
      },
    },
  },
  testEnvironment: "jsdom",
};
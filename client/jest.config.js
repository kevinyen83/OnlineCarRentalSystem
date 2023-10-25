module.exports = {
    testEnvironment: "jsdom",
    transform: {
          "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
        "^axios$": "axios/dist/axios"
      }
};
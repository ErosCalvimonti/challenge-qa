const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "hyexer",
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "https://calendar-challenge-six.vercel.app/",
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  },
});

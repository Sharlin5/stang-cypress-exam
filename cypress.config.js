const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "96srdf",
  e2e: {
    baseUrl: "https://testautomation-ph-quiz-app.vercel.app",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});

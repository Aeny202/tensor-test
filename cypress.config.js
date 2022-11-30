const {defineConfig} = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://playground.tensorflow.org',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

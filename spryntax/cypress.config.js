// spryntax/cypress.config.js

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // If your application runs at http://localhost:3000, set that here
    baseUrl: 'http://localhost:8080',

    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    supportFile: false,

    // Uncomment if you need extra time for certain operations:
    // defaultCommandTimeout: 8000,
  },
});

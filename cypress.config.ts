import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    supportFile: false,
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

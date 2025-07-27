const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    videosFolder: 'cypress/videos',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    specPattern: 'cypress/e2e/**/*.spec.js',
    experimentalSessionAndOrigin: true,
    experimentalWebKitSupport: true,
    setupNodeEvents(on, config) {
      // Visual Testing Plugin
      on('task', {
        compareSnapshots: (options) => {
          // Custom visual comparison logic can be added here
          return null
        }
      })

      // Generate coverage reports
      on('after:run', (results) => {
        console.log('📊 Test Results:', results)
      })

      return config
    },
  },

  // Component Testing Configuration
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.js'
  },

  // Visual Testing Configuration
  env: {
    visualTesting: true,
    snapshotDirectory: 'cypress/snapshots',
    failureThreshold: 0.1,
    thresholdType: 'percent'
  }
})
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Import visual testing plugin
import '@cypress/snapshot/register'

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
})

// Custom command to check if element exists
Cypress.Commands.add('elementExists', (selector) => {
  cy.get('body').then(($body) => {
    if ($body.find(selector).length > 0) {
      return true
    } else {
      return false
    }
  })
})

// Custom command to clear and type
Cypress.Commands.add('clearAndType', (selector, text) => {
  cy.get(selector).clear().type(text)
})

// Custom command to wait for API response
Cypress.Commands.add('waitForApi', (method, url) => {
  cy.intercept(method, url).as('apiCall')
  cy.wait('@apiCall')
})

// Visual Testing Commands
Cypress.Commands.add('visualSnapshot', (name, options = {}) => {
  if (Cypress.env('visualTesting')) {
    cy.wait(500) // Allow UI to settle
    cy.matchImageSnapshot(name, {
      threshold: Cypress.env('failureThreshold') || 0.1,
      thresholdType: Cypress.env('thresholdType') || 'percent',
      ...options
    })
  }
})

// Custom command for responsive visual testing
Cypress.Commands.add('responsiveSnapshot', (name, viewports = []) => {
  const defaultViewports = [
    { width: 1280, height: 720, name: 'desktop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' }
  ]

  const testViewports = viewports.length ? viewports : defaultViewports

  testViewports.forEach(viewport => {
    cy.viewport(viewport.width, viewport.height)
    cy.wait(200) // Allow layout to adjust
    cy.visualSnapshot(`${name}-${viewport.name}`)
  })
})

// Enhanced login command with visual verification
Cypress.Commands.add('loginWithVisual', (username = 'testuser', password = 'testpass') => {
  cy.visit('/')
  cy.visualSnapshot('login-page')
  cy.get('[data-testid="username"]').type(username)
  cy.get('[data-testid="password"]').type(password)
  cy.get('[data-testid="login-button"]').click()
  cy.get('.dashboard-container').should('be.visible')
  cy.visualSnapshot('dashboard-after-login')
})
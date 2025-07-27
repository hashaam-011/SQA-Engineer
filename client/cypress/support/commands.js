// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Visual testing plugin removed - not needed for basic functionality

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

// Visual Testing Commands (simplified - no external dependencies)
Cypress.Commands.add('visualSnapshot', (name, options = {}) => {
  if (Cypress.env('visualTesting')) {
    cy.wait(500) // Allow UI to settle
    cy.screenshot(name, options) // Use built-in Cypress screenshot
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
  cy.get('input[type="text"]').type(username)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.get('.dashboard-container').should('be.visible')
  cy.visualSnapshot('dashboard-after-login')
})
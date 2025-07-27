// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add custom commands here if needed
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/')
  cy.get('[data-testid="username"]').type(username)
  cy.get('[data-testid="password"]').type(password)
  cy.get('[data-testid="login-button"]').click()
})

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"]').click()
})

Cypress.Commands.add('createTodo', (text) => {
  cy.get('[data-testid="todo-input"]').type(text)
  cy.get('[data-testid="add-button"]').click()
})

Cypress.Commands.add('deleteTodo', (index = 0) => {
  cy.get('[data-testid="delete-button"]').eq(index).click()
})

Cypress.Commands.add('editTodo', (index = 0, newText) => {
  cy.get('[data-testid="edit-button"]').eq(index).click()
  cy.get('[data-testid="edit-input"]').clear().type(newText)
  cy.get('[data-testid="save-button"]').click()
})

Cypress.Commands.add('toggleTodo', (index = 0) => {
  cy.get('[data-testid="todo-checkbox"]').eq(index).click()
})
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
 Cypress.Commands.add('corr_login', (email,password) => {
    cy.get('input[placeholder="Username"]').clear().type(email)
    cy.get('input[placeholder="Password"]').clear().type(password)
    cy.get('.login-form__login-button').click({force:true})
  })
 Cypress.Commands.add('wrong_login', (email,password) => {
  cy.get('input[placeholder="Username"]').type(email)
    cy.get('input[placeholder="Password"]').type(password)
    cy.get('.login-form__login-button').click({force:true})
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

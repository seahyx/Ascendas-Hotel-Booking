/// <reference types="cypress" />
// @ts-check

describe('Navigation', () => {
  it('should navigate to the login page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="login"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/login')

    // The new page should contain an h1 with "About page"
    cy.get('h2').contains('Login')
  })
})

describe('Navigation', () => {
  it('should navigate to the register page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/login')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="register"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/register')

    // The new page should contain an h1 with "About page"
    cy.get('h2').contains('Register')
  })
})


const asModule = {}
export default asModule
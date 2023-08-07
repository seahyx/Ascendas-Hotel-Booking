/// <reference types="cypress" />
// @ts-check

describe('Navigation', () => {
  describe('Navigate from index to login', () => {
    it('should navigate to the login page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
  
      // Find a link with an href attribute containing "login" and click it
      cy.get('a[href*="login"]').click()
  
      // The new url should include "/login"
      cy.url().should('include', '/login')
  
      // The new page should contain an h2 with "Login"
      cy.get('h2').contains('Login')
    })
  })
  describe('Navigate from login to register', () => {
    it('should navigate to the register page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/login')
  
      // Find a link with an href attribute containing "register" and click it
      cy.get('a[href*="register"]').click()
  
      // The new url should include "/register"
      cy.url().should('include', '/register')
  
      // The new page should contain an h2 with "Register"
      cy.get('h2').contains('Register')
    })
  })
  /*
  describe('Navigate from profile to bookingHistory', () => {
    it('should navigate to the history page', () => {
      // Start from the profile page
      cy.visit('http://localhost:3000/profile')

      // Find a link with an href attribute containing "login" and click it
      cy.get('a[href*="login"]').click()
  
      // The new url should include "/login"
      cy.url().should('include', '/login')

      // The new page should contain an h2 with "Login"
      cy.get('h2').contains('Login')
    })
  })
  describe('Navigate from id to payment', () => {
    it('should navigate to the payment page', () => {
      // Start from the details page
      cy.visit('http://localhost:3000/details')

      // Find a link with an href attribute containing "payment" and click it
      cy.get('a[href*="payment"]').click()
  
      // The new url should include "/payment"
      cy.url().should('include', '/payment')

      // The new page should contain an h2 with "Payment"
      cy.get('h2').contains('Payment')
    })
  })

  */
})

/* 
describe('Navigation', () => {
  
})
*/

const asModule = {}
export default asModule
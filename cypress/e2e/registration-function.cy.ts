/// <reference types="cypress" />
// @ts-check

describe('Login', () => {
    it('should allow input & button click', () => {
      cy.visit('http://localhost:3000/register')
      cy.get('input[name="name"]').type("Guest")
      cy.get('input[name="email"]').type("abc@example.com")
      cy.get('input[name="password"]').type("Password1")
      cy.get('input[name="confirmPassword"]').type("Password1")
      cy.get("button").click
    })
    it('should NOT allow registration if invalid email', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('input[name="name"]').type("Guest")
        cy.get('input[name="email"]').type("abc")
        cy.get('input[name="password"]').type("Password1")
        cy.get('input[name="confirmPassword"]').type("Password1")
        cy.get("button").click
        cy.url().should('include', '/register')
      })
    it('should NOT allow registration if invalid password', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('input[name="name"]').type("Guest")
        cy.get('input[name="email"]').type("abc@example.com")
        cy.get('input[name="password"]').type("Pas")
        cy.get('input[name="confirmPassword"]').type("Pas")
        cy.get("button").click
        cy.url().should('include', '/register')
      })
      it("should NOT allow registration if passwords don't match", () => {
        cy.visit('http://localhost:3000/register')
        cy.get('input[name="name"]').type("Guest")
        cy.get('input[name="email"]').type("abc@example.com")
        cy.get('input[name="password"]').type("Pasword1")
        cy.get('input[name="confirmPassword"]').type("Password2")
        cy.get("button").click
        cy.url().should('include', '/register')
      })
    it('should allow registration if valid inputs', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('input[name="name"]').type("") //TO-DO
        cy.get('input[name="email"]').type("") //TO-DO
        cy.get('input[name="password"]').type("") //TO-DO 
        cy.get('input[name="confirmPassword"]').type("")
        cy.get("button").click
        cy.url().should("not.include", "/register")
      })
      it('should allow login after valid registration', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('input[name="name"]').type("") //TO-DO
        cy.get('input[name="email"]').type("") //TO-DO
        cy.get('input[name="password"]').type("") //TO-DO
        cy.get("button").click
        cy.get('a[href*="login"]').click()

        cy.get('input[name="email"]').type("") //TO-DO
        cy.get('input[name="password"]').type("") //TO-DO
        cy.get("button").click
        cy.url().should("not.include", "/login")
      })
  })
/// <reference types="cypress" />
// @ts-check

describe('Login', () => {

  function generateRandomString(length: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
    it('should allow input & button click', () => {
      cy.visit('http://localhost:3000/login')
      cy.get('input[name="email"]').type("abc@example.com")
      cy.get('input[name="password"]').type("Password1")
      cy.get("#submit").click()
    })
    it('should NOT allow log in if invalid email or password', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[name="email"]').type(generateRandomString(10) + "@example.com")
        cy.get('input[name="password"]').type(generateRandomString(10))
        cy.get("button").click() 
        cy.url().should('include', 'error')
      })
    it('should allow log in (& redirect to main) if correct email and password', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[name="email"]').type("test1@test.com") 
        cy.get('input[name="password"]').type("test")
        cy.get("#submit").click()
        cy.url().should("not.include", "/login") 
      })
    for(let i = 0; i<20;i++){
      it('should not crash after fuzzing, test:' + i, () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[name="email"]').type(generateRandomString(10) + "@example.com")
        cy.get('input[name="password"]').type(generateRandomString(10))
        cy.get("#submit").click()
      })
    }
  })
/// <reference types="cypress" />
// @ts-check

describe('Login', () => {
    it('should allow input & button click', () => {
      cy.visit('http://localhost:3000/login')
      cy.get('input[name="email"]').type("abc@example.com")
      cy.get('input[name="password"]').type("Password1")
      cy.get("button").click
    })
    it('should NOT allow log in if invalid email or password', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[name="email"]').type("abc@example.com")
        cy.get('input[name="password"]').type("Password1")
        cy.get("button").click //TO-DO
        cy.url().should('include', '/login')
      })
    it('should allow log in (& redirect to main) if correct email and password', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[name="email"]').type("") //TO-DO
        cy.get('input[name="password"]').type("") //TO-DO
        cy.get("button").click //TO-DO
        cy.url().should("not.include", "/login") 
      })

    it('should not crash after fuzzing', () => {
      function generateRandomString(length: number) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        return result;
      }

      cy.visit('http://localhost:3000/login')

      for(let i = 0; i<100;i++){
        cy.get('input[name="email"]').type(generateRandomString(10) + "@example.com")
        cy.get('input[name="password"]').type(generateRandomString(10))
        cy.get("button").click //TO-DO
      }
    })
  })
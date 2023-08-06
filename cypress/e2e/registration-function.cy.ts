/// <reference types="cypress" />
// @ts-check

describe('Registration', () => {
    it('should allow input & button click', () => {
      cy.visit('http://localhost:3000/register')
      cy.get('input[name="name"]').type("Guest")
      cy.get('input[name="email"]').type("abc@example.com")
      cy.get('input[name="password"]').type("Password1")
      cy.get('input[name="confirmPassword"]').type("Password1")
      cy.get("#submit").click()
    })
    it('should NOT allow registration if invalid email', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('input[name="name"]').type("Guest")
        cy.get('input[name="email"]').type("abc")
        cy.get('input[name="password"]').type("Password1")
        cy.get('input[name="confirmPassword"]').type("Password1")
        cy.get("#submit").click() //TO-DO 
        cy.url().should('include', '/register')
      })
    it('should NOT allow registration if invalid password', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('input[name="name"]').type("Guest")
        cy.get('input[name="email"]').type("abc@example.com")
        cy.get('input[name="password"]').type("Pas")
        cy.get('input[name="confirmPassword"]').type("Pas")
        cy.get("#submit").click() //TO-DO 
        cy.url().should('include', '/register')
      })
      it("should NOT allow registration if invalid confirm password", () => {
        cy.visit('http://localhost:3000/register')
        cy.get('input[name="name"]').type("Guest")
        cy.get('input[name="email"]').type("abc@example.com")
        cy.get('input[name="password"]').type("Password1")
        cy.get('input[name="confirmPassword"]').type("P2")
        cy.get("#submit").click() //TO-DO 
        cy.url().should('include', '/register')
      })
    it('should allow registration if valid inputs', () => {
      function generateRandomString(length: number) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        return result;
      }
        cy.visit('http://localhost:3000/register')
        cy.get('input[name="name"]').type(generateRandomString(10)) 
        cy.get('input[name="email"]').type(generateRandomString(10) + "@" + generateRandomString(5) + ".com") 
        let pass = generateRandomString(10)
        cy.get('input[name="password"]').type(pass)
        cy.get('input[name="confirmPassword"]').type(pass) 
        cy.get("#submit").click()  
        cy.url().should("not.include", "error")
      })

      function generateRandomString(length: number) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        return result;
      }

      for(let i = 0; i<20;i++){
        it('should not crash after fuzzing, test:' + i, () => {
          cy.visit('http://localhost:3000/register')
          cy.get('input[name="name"]').type(generateRandomString(10))
          cy.get('input[name="email"]').type(generateRandomString(10) + "@example.com")
          let pass = generateRandomString(10)
          cy.get('input[name="password"]').type(pass)
          cy.get('input[name="confirmPassword"]').type(pass)
          cy.get("#submit").click() //TO-DO
        })
      }
  })
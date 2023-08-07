/// <reference types="cypress" />
// @ts-check

describe('Autocomplete', () => {
  function generateRandomString(length: number) {
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    }

    for(let i = 0; i < 100; i++){
      it('should autocomplete in a loop' + i, () => {
        cy.visit('http://localhost:3000/')
        cy.get('#auto-box').click()
        cy.focused().type(generateRandomString(10))
        cy.wait(3000)
      })
    } 
  })
  

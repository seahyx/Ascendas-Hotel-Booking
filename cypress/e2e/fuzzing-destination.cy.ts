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
        cy.find('[aria-activedescendant="auto-box-option-0"]').click({force:true}) //TO-DO
      })
    } 
  })

// describe('Autocomplete', () => {

//   it('should autocomplete', () => {
//     cy.visit('http://localhost:3000/')
//     cy.get("#auto-box").click()
//     cy.focused().type('barcelona')
//     cy.contains('Barcelona, Spain')
//       .should('be.visible')
//       .should('have.class', 'MuiAutocomplete-option')
//       .click()
//     cy.get("#auto-box").should('have.value', 'Barcelona, Spain') 
//   });

//   it('should pick a date', () => {
//     cy.visit('http://localhost:3000/')
//     //cy.get(".MuiTypography-root MuiTypography-body1 w-full truncate px-3 text-center css-nwh2cx-MuiTypography-root")
//     cy.get("#check-text")
//       .should('be.visible')
//       .contains('Check-in/out')
//     cy.get('#date-box').click()
//     cy.get("#calendar")
//       .contains('4').click({force: true})
//     cy.get('#endDate')
//       .contains('8').click({force: true})
//     cy.get("#check-text")
//       .should('be.visible')
//       .contains('4 Aug 2023 - 8 Aug 2023')

//   });
// })

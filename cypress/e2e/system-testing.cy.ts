/// <reference types="cypress" />
// @ts-check

describe('From Start to Finish', () => {
  it('implement the app', () => {
    cy.visit('http://localhost:3000/')
    cy.visit('http://localhost:3000/register')
    cy.get('input[name="name"]').type("Guest")
    cy.get('input[name="email"]').type("abc@example.com")
    cy.get('input[name="password"]').type("Password1")
    cy.get('input[name="confirmPassword"]').type("Password1")
    cy.get('.PrivateSwitchBase-input').check();
    cy.get("#submit").click()
    cy.wait(5000)

    cy.get("#auto-box").click()
    cy.focused().type('barcelona')
    cy.wait(2000)
    cy.contains('Barcelona, Spain')
      .should('be.visible')
      .should('have.class', 'MuiAutocomplete-option')
      .click()
    cy.get("#auto-box").should('have.value', 'Barcelona, Spain') 

    cy.get("#check-text")
      .should('be.visible')
      .contains('Check-in/out')
    cy.get('#date-box').click()
    cy.wait(1000)
    cy.get("#calendar")
      .contains('22').click({force: true})
      cy.wait(1000)
    cy.get('#endDate')
      .contains('28').click({force: true})
    cy.get("#check-text")
      .should('be.visible')
      .contains('22 Aug 2023 - 28 Aug 2023')

    cy.get('#guest-button').click()
    cy.get('#guest-card')
      .contains('Adults')
      .wait(1000)
      .get('#plus-button').click({force: true})
    cy.get('#guest-text').contains('2 Adults/1 Room')
    cy.wait(2000)
    cy.get('#search').click()
    cy.get('#search > .MuiTypography-root').click()
    cy.url().should('include', '/search?')
    cy.wait(5000)

    cy.get(':nth-child(1) > .MuiButtonBase-root > .p-4 > .css-m69qwo-MuiStack-root > .MuiTypography-root').click();
    cy.wait(3000)


  })
})

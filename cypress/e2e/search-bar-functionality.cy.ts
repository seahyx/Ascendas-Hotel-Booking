/// <reference types="cypress" />
// @ts-check

describe('Autocomplete the seachbar', () => {
  it('implement the searchbar', () => {
    cy.visit('http://localhost:3000/')
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
    //Down below is the URL when u fill in the above details. Need to do this because cypress does not load pages unless you 
    //input cy.visit(). So if u want to change the details, remember to change the search URL as well.
    //If u have any idea to make it better feel free to change
    cy.visit('http://localhost:3000/search?search=%7B%22dest%22%3A%7B%22term%22%3A%22Barcelona%2C+Spain%22%2C%22uid%22%3A%22FkG9%22%2C%22lat%22%3A41.387917%2C%22lng%22%3A2.169919%2C%22type%22%3A%22city%22%2C%22state%22%3A%22Barcelona%22%7D%2C%22checkInDate%22%3A%222023-08-23T15%3A48%3A40.000Z%22%2C%22checkOutDate%22%3A%222023-08-28T15%3A48%3A40.000Z%22%2C%22guests%22%3A%7B%22adults%22%3A2%2C%22child%22%3A0%2C%22rooms%22%3A1%7D%7D')
    cy.url().should('include', '/search?')
    cy.wait(5000)

    cy.get('#hotel-list').find('[href="/hotels/4ptz"]').click()
    cy.visit('http://localhost:3000/hotels/4ptz')
    cy.wait(3000)


  })
})

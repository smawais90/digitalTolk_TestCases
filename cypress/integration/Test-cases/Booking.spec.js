import 'cypress-xpath';
const data = require('../../fixtures/data')
var fn = require('../../fixtures/functions/Booking')

describe('Book an appointment', () => {
  beforeEach(() => {
    cy.viewport(1280,720) 
  })
  it('Main page should be opened successfully', () => {
      cy.visit('/')

      //Assertion to check webiste is opened successfully
      cy.get('.default-layout__nav-container').should('exist')
      cy.url().should('eq', 'https://ct.digitaltolk.se/')
    })
    it('language should be set to english successfully', () => {
      fn.change_lang()

      // checking Translations for few of to assert that our page has been translated successfully
      cy.get('.home-page__banner-action-login > span').should('contain.text', 'Log in')
      cy.get('.home-page__banner-action-register > span').should('contain.text', 'Register')
      cy.get('#tab-default > div > span' ).should('contain.text', 'Booking')
      cy.get('#tab-emergency > div > span').should('contain.text', 'Emergency Booking')
      cy.get('#tab-convey > div > span').should('contain.text', 'Convey Service')
      cy.get('#tab-text_translation > div > span').should('contain.text', 'Text Translation')
    })
    it ('User should be redirected to login page successfully', () => {
      cy.get('.home-page__banner-action-login').click({force:true})
      cy.wait(5000)
      cy.url().should('contain', '/login')
    })
    it('Login should be failed with wrong credentials' , () => {
      cy.wait(2000)
      cy.wrong_login(data.login_incorr.email,data.login_incorr.password)

      //assertion to check error message on wrong credentials
      cy.get('.el-notification__content > p').should('contains.text', data.error_message)
    })

    it('Login should be successful with correct credentials' , () => {
      cy.wait(2000)
      cy.corr_login(data.login_corr.email,data.login_corr.password)

      //assertions  to check we reached successfully on login page
      cy.url().should('not.contain','/login')
      cy.get('.auth-controls__dropdown-name').should('contain.text',' Awais ')
    })
    it ('User should initiate booking successfully', () => {
      cy.get('input[placeholder="Select Language"]').click({force:true})
      cy.wait(3000)
      cy.get('input[placeholder="Select Language"]').type(`Lud{uparrow}{enter}`, {force:true})

      // Select Date 8 days ahead
      fn.date_select()

      // select time 8 hours ahead 
      fn.time_select()

      // Fill other Information
      fn.other_info()

      // Solving Unauthorized by Signing In again
      cy.corr_login(data.login_corr.email,data.login_corr.password)
    })
    it ('should create booking successfully' , () => {
      cy.wait(5000)
      cy.get('.el-dialog__header').contains('Confirmation').should('exist')
      fn.create_booking();

      // assertion to check appointment has been made successfully
      cy.get('.booking-submit-success-modal__booking').should('exist')

   })
})


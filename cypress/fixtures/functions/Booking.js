const data = require('../../fixtures/data')
 var appointments = ['input[value="physical"]','input[value="phone"]','input[value="video"]']
 var appointment = appointments[Math.floor(Math.random()*appointments.length)];

 var change_lang = () => {
  cy.wait(10000)
  cy.get('.el-input__suffix-inner').eq(0).click({force:true})
  cy.get('ul > li').contains(' EN ').click({force:true})
}

 var  date_select = () => {

  // selecting Date 8 days ahead
  let date = new Date()                      
  date.setDate(date.getDate() + 8)
  let futureDay = date.getDate()                              // get 6 (integer)
  let futureMonth = date.getMonth()                            // gets 7 (integer) for August          
  cy.get('input[placeholder="Day"]').click({force:true})
  cy.get('.flatpickr-current-month > select > option').eq(0)    
    .invoke('val')                                            // this is the currently selected month
    .then(dateAttribute => {                                  // this is "6" for July (months are 0-based)
      if (+dateAttribute !== futureMonth) { 
        cy.get('.flatpickr-next-month').click({force: true})  // change month to Aug
      }
  
      cy.get('.dayContainer')                    
        .contains(new RegExp("^" + futureDay + "$", "g"))     // select currentDate+8
        .click({force:true})                     
    })
}
//select time 
 var time_select = () => {

  cy.get('.el-input--suffix').eq(2).click({force:true}).then((d) => {
    var d = new Date()
    d.setHours(d.getHours() + 4); // Sweeden time is 3 hours behind so I added 4 hours in Pk time to make the difference of 7 hours
    var h = d.getHours()
    cy.log(h)
    d.setMinutes(30)
    var m = d.getMinutes()
    var time = `${h}:${m}`
    cy.get('input[placeholder="Start Time"]').type(`${time}{enter}`)
    cy.get('input[placeholder="Start Time"]').invoke('val').then((p) => {
      cy.log(p)
    })
  })
}
// fill out other info
 var other_info = () => {
  
    //checking random appointment type
    cy.get(`${appointment}`).check({force:true})
    cy.get('.normal-booking-form__other-options-title').click({force:true})
    cy.get('.el-input__inner').eq(4).click({force:true})
    cy.get('.el-select-dropdown__list >li').contains('Female').click({force:true})
    cy.get('input[placeholder="Select specific Translator"]').type('awais{enter}',{force:true},{delay:30})
    cy.wait(2000)
    cy.get('.el-select-dropdown__list>li').contains('Awais Test Translator - 80896').click({force:true})
    cy.get('input[type="file"]')
      .attachFile('bird-thumbnail');
    cy.wait(2000)
    cy.clearCookies();
    cy.get('.normal-booking-form__book-button').click({force:true})
    cy.wait(2000)
    cy.get('.normal-booking-form__book-button').click({force:true})
    
}

 var create_booking = () => {
   // check if appointment already exist in that time slot
  // cy.get('body').then($body => {
  //   if ($body.find('.el-button--primary').eq(1)) {
  //     cy.get('.el-button--primary').eq(1).click({force:true})
  //   }
  // })
    cy.get('input[placeholder="Input Booker Name"]').type(data.bookerInfo.bookerName, {force:true})
    cy.get('input[placeholder="Input Staff Name"]').type(data.bookerInfo.staffName, {force:true})
    cy.get('.el-input__inner').eq(9).type(data.bookerInfo.bookingRef, {force:true})
    cy.get('textarea').type(data.bookerInfo.bookingNotes, {force:true})
    cy.get('input[value="fax"]').check({force:true})
    cy.get('input[placeholder="Ange i formatet 468738293 utan mellanslag, +, eller 00"]').type(data.bookerInfo.fax, {force:true})
    cy.get('.booking-confirm-form__question-field-container').find('input[value="false"]').eq(0).check({force:true})
    cy.get('.booking-confirm-form__question-field-container').find('input[value="false"]').eq(1).click({force:true}).check({force:true})

      switch(appointment) {
        case 'input[value="physical"]' :
          cy.get('.booking-confirm-form__change-address-button').click({force:true})
          cy.get('#google_address_autocomplete').type(data.bookerInfo.address, {force:true})
          cy.get('textarea').eq(1).type(data.bookerInfo.addressDetail, {force:true})
          cy.get('.booking-confirm-form__submit-button').click({force:true})
          break;
        
        case 'input[value="phone"]' : 
          cy.get('.booking-confirm-form__submit-button').click({force:true})  
          break;
        
        case 'input[value="video"]' :  
          //cy.get('input[value="jitsi]').check() // Jitsi is already checked
          cy.get('.booking-confirm-form__submit-button').click({force:true})
          break;
        
        default: 
          break;
        
      }
            }

export {change_lang,date_select,time_select,other_info, create_booking,appointments,appointment}
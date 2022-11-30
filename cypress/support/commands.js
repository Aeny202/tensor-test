// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-wait-until';

Cypress.Commands.add('setSliderValue', {prevSubject: 'element'}, (subject, value) => {
  setSliderValue({subject: subject, value: value});

  // https://github.com/cypress-io/cypress/issues/1570
  function setSliderValue({subject, value}) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    cy.get(subject)
        .then(($range) => {
          // get the DOM node
          const range = $range[0];
          // set the value manually
          nativeInputValueSetter.call(range, value);
          // now dispatch the event
          range.dispatchEvent(new Event('input', {value: value, bubbles: true}));
        });
  }
});

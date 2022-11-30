import 'cypress-wait-until';


/**
   * A function that changes the value of material sliders.
   * @name setSliderValue
   * @kind function
   * @param {Cypress.Chainable} subject: Cypress element which is the material slider
   * @param {string} value: value to slide the slider to
   * @return {void}
   */
function setSliderValue({subject, value}) {
  const nativeInputValueSetter =
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
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

Cypress.Commands.add('setSliderValue', {prevSubject: 'element'}, (subject, value) => {
  setSliderValue({subject: subject, value: value});
});

import {tensorPage} from '../pages/tensor.po';

describe('tensorflow', () => {
  it('should be able to print test loss value', () => {
    // Go to the page
    cy.visit('/');

    // report value to console
    cy.get(tensorPage.testLossValue)
        .invoke('text')
        .then((txt) => console.log(`test loss value: ${txt}`));

    // set dataset to exclusive
    cy.get(tensorPage.dataset.xor).click();

    // set noise
    cy.get(tensorPage.ratioOfTraining.noise).setSliderValue('5');

    // select two more features
    cy.get(tensorPage.features.xSquared).click();
    cy.get(tensorPage.features.ySquared).click();

    // assert amount of nodes before removal
    cy.get(tensorPage.nodes.network).find(tensorPage.nodes.node).should('have.length', 13);

    // remove 1 neuron of layer 1
    cy.get(tensorPage.nodes.layer)
        .eq(0)
        .within(() => cy.get(tensorPage.nodes.removeButton).click());

    // remove 1 neuron of layer 2
    cy.get(tensorPage.nodes.layer)
        .eq(1)
        .within(() => cy.get(tensorPage.nodes.removeButton).click());

    // assert amount of nodes after removal of 2
    cy.get(tensorPage.nodes.network).find(tensorPage.nodes.node).should('have.length', 11);

    // set learning rate
    cy.get(tensorPage.topControls.learningRateSelector).select('0.1');

    // plqy until epoch > 0.3
    cy.get(tensorPage.topControls.playButton).click();
    cy.waitUntil(() =>
      cy.get(tensorPage.topControls.epochNumber)
          .invoke('text')
          .then((txt) => parseFloat(txt.replace(',', '.')) >= 0.3)
    , {timeout: 20_000, interval: 1_000});
    cy.get(tensorPage.topControls.playButton).click();

    // report value to console
    cy.get(tensorPage.testLossValue)
        .invoke('text')
        .then((txt) => console.log(`test loss value: ${txt}`));
  });
});

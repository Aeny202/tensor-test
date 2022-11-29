import { tensorPage } from "../pages/tensor.po"

describe('tensorflow', () => {
  it('should be able to print test loss value', () => {
    cy.visit('/')
    cy.get(tensorPage.testLossValue).invoke('text').then(txt => console.log(`test loss value: ${txt}`))
    cy.get(tensorPage.dataset.xor).click()
    cy.get(tensorPage.ratioOfTraining.noise).setSliderValue("5")
    cy.get(tensorPage.features.xSquared).click()
    cy.get(tensorPage.features.ySquared).click()
    cy.get(tensorPage.nodes.layer).eq(0).within(() => cy.get(tensorPage.nodes.removeButton).click())
    cy.get(tensorPage.nodes.layer).eq(1).within(() => cy.get(tensorPage.nodes.removeButton).click())
    //TODO: assert amount of nodes
    cy.get(tensorPage.topControls.learningRateSelector).select('0.1')

    cy.get(tensorPage.topControls.playButton).click()
    cy.waitUntil(() =>
      cy.get(tensorPage.topControls.epochNumber)
        .invoke('text')
        .then(txt => parseFloat(txt.replace(',', '.')) >= 0.3)
      , { timeout: 20_000, interval: 1_000 })
    cy.get(tensorPage.topControls.playButton).click()
    cy.get(tensorPage.testLossValue).invoke('text').then(txt => console.log(`test loss value: ${txt}`))
  })
})
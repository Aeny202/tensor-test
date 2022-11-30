export const tensorPage = {
  testLossValue: '[id="loss-test"]',
  dataset: {
    xor: '[data-dataset="xor"]',
  },
  ratioOfTraining: {
    noise: '[id="noise"]',
  },
  features: {
    xSquared: '[id="canvas-xSquared"]',
    ySquared: '[id="canvas-ySquared"]',
  },
  nodes: {
    layer: '[class="plus-minus-neurons"]',
    removeButton: 'button:contains("remove")',
    network: '[id="network"]',
    node: 'div[id|="canvas"]',
  },
  topControls: {
    learningRateSelector: '[id="learningRate"]',
    playButton: '[id="play-pause-button"]',
    epochNumber: '[id="iter-number"]',
  },
};


# crypto-visualizer

Web app made with React to visualize cryptocurrency transactions across many exchanges.

## Week 5 Progress

You can access the deployed app here: [Crypto Visualizer](https://react-crypto-visualizer.herokuapp.com/)

### Create a basic bubble web element

The [TransactionBubble](./src/components/TransactionBubble) component has been created based off the designs.

### Add the functionality for generating bubbles of different sizes

There is a `Spawn Bubbles` button that displays on the bottom left of the page. When clicked, a bubble generates using a random number to show different sized bubbles being generated. There is a bubble counter on the bottom right of the screen.

- Note: the spawn button will be removed in the next iteration as the live cryptocurrency data will be generating the bubbles.

### Add a basic animation for moving the bubbles down the screen

I originally wrote "down" but I realized that is not how real water bubbles work. When a bubble is generated, it is placed below the bottom of the screen and animates up using a CSS animation. After the bubble floats up and disappears above the screen, the bubble's web component is deleted from the DOM.

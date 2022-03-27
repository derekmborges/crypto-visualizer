
# crypto-visualizer

Web app made with React to visualize cryptocurrency transactions across many exchanges.

## Week 6 Progress

### Generating a bubble for every transaction

For every transaction that is received over the WebSocket connection proved out in Week 4, the app now generates a bubble to display on the canvas.

### Refactor Canvas and Bubble Components

For performance reasons, the bubble from previous weeks did not perform well when the canvas was trying to generate many bubbles. I ended up going with a javascript canvas-renderer called [p5.js](https://p5js.org/). Consequently, this library also did not perform that well either. I think the reason is due to the fact that the socket is receiving a lot of transactions and it's difficult for the DOM to render that many animated components. For the purposes of the demo video, I limited the canvas to about 15-20 bubbles so that it could perform well enough to prototype the functionality. I hope to optimize the behavior in future weeks.

## Week 7 Progress

### Complete the menu according to the design.

The dropdown fields for selecting a cryptocurrency and the exchange have been added to the menu component. They are material dropdowns from [Material UI](https://v4.mui.com). Those were the dropdowns the most closely appeared like the fields in the designs.

### Make the menu able to be hidden or shown by the user.

The menu can now be opened and closed. The menu animates in when opened and just disappears when the `X` is clicked at the top-left.

### Add the ability to let the user change which cryptocurrency to watch.

The app now responds to the newly added dropdown fields. When a user selects a different cryptocurrency or exchange, the socket updates the channels it's subscribed to in order to receive the desired trades that the user changed it to. Behind the scenes, the queue of transactions to create bubbles for is cleared out to make way for the new trades coming in.

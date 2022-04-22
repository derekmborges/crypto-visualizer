
# crypto-visualizer

Web app made with React to visualize cryptocurrency transactions across many exchanges.

## Week 8 Progress

### Add Connection status indicators

There are now 2 visual indicators for the user to see if the application is unable to successfully connect over the Websocket connection. The first is the in the menu on the top-left, and the second is in the middle of the canvas. This reacts to the status of the websocket connection and displays a "refresh" button that will reload the page for them to see if it was just a fluke.

### Test the responsiveness

I had originally planned to add in device responsiveness later in the project, but as I was doing some testing this week I noticed that the app was already quite responsive with the styles I had applied in previous weeks. I made sure to implement the connection error message so that it would stay in the center for all screen sizes.
## Week 9 Progress

### Make menu options dynamic

Instead of having the menu display a static list of options for the coin and exchange, now it loads a dynamic list of top coins and exchanges from Cryptocompare. This makes the application more future-proof, the list of popular coins could change down the line and this wouldn't require a code update to the app.

### Default the exchange and currency

Now that the list of currency and exchange options are dynamic, the menu now defaults to the top coin and top exchange. This allows the application to be the most relevant to a user visiting the site. At the time of building this, Bitcoin is the most popular cryptocurrency. If someone visits the site and doesn't know much about crypto, they will likely have heard of Bitcoin.

### Remaining Progress

In the remaining time I have for this project, I am going to work on making the bubbles more performant. Whether I need to only generate every nth transaction or find a different library that can manage the moving DOM elements, I need to find some solution to make it a more pleasurable experience for the user.

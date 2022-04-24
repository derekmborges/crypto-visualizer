
# crypto-visualizer

Web app made with React to visualize cryptocurrency transactions across many exchanges.

## Final Progress

### Re-design bubble element

As a result of some research on best practices for animating web elements, the bubble element has been changed to be an SVG animated with a library called `react-spring`. The SVGs are much more performant now and appear much smoother in the application.

### Implement redux for transactions

Previously, the transactions coming in over the WebSocket were being maintained in the App parent component and passed down to child components. This presented an issue when a component multiple children down needed to trigger a change to the state of the transactions. Rather than pass method calls all the way back up to the App component, this justified the use of Redux. Now, the app's transactions are stored in a common state object and served to all the components that need access to it. Additionally, any component can trigger a change to the state and that change gets reflected automatically in all the other componentes.

### Optimize performance

Due to the sheer volume of crypto transactions that occur on an exchange at any given time, it is difficult for the app to attempt to display every one without performing extremely slow. The application now displays every 20th transaction that comes over the socket. This optimizes performance by limiting the number of bubble elements that will exist and animated at a time.

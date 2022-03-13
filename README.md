
# crypto-visualizer

Web app made with React to visualize cryptocurrency transactions across many exchanges.

## Week 4 Progress

You can access the deployed app here: [Crypto Visualizer](https://react-crypto-visualizer.herokuapp.com/)

### Created API key for cryptocurrency data

I was able to find an API that allows you to retrieve crypto data for many coins across all the major exchanges: [CryptoCompare](https://www.cryptocompare.com/). I created a free API key and stored it in an environment variable in a file named `.env`. React will inject all the variables in this file that begin with `REACT_APP_` to be able to be read from the code. The file is ignored by git as these are sensitive values. The file is shown below with a redacted key:

`.env`

```bash
REACT_APP_API_BASE_URL=https://min-api.cryptocompare.com/data/v4
REACT_APP_WS_BASE_URL=wss://streamer.cryptocompare.com/v2
REACT_APP_API_KEY=<your-api-key>
```

### Add WebSocket connection capabilities, but just log the transactions to the console

Using Bitcoin as the cryptocurrency to watch for now, the app now has a WebSocket implemented. As trade updates are received, they are logged to the console in a readable format.

Unfortunately, the original NPM package I was planning on using does not work with the version of Node/React I'm using. I am now using [react-use-websocket](https://www.npmjs.com/package/react-use-websocket).

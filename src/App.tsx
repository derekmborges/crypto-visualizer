import './App.css';
import Canvas from './components/Canvas/Canvas';
import Menu from './components/Menu/Menu';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useEffect } from 'react';
import { Transaction } from './models/transaction';

function App() {
  // Initiate WebSocket connection
  const wsBase = process.env.REACT_APP_WS_BASE_URL
  const apiKey = process.env.REACT_APP_API_KEY
  const {
    lastMessage,
    sendMessage,
    readyState
  } = useWebSocket(`${wsBase}?api_key=${apiKey}`)
  
  // Respond to new messages coming in from the data provider
  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data)

      // If the welcome message is received, the app is ready
      // to request trade updates over the socket
      // e.g. BTC-USD on Coinbase
      if (data?.MESSAGE === 'STREAMERWELCOME') {
        console.log('subscribing to channel...')
        var subRequest = {
          "action": "SubAdd",
          "subs": ["0~Coinbase~BTC~USD"]
        };
        sendMessage(JSON.stringify(subRequest))

      }
      
      // If the app receives a trade update,
      // create a Transaction and log it to the console for now
      else if (data?.TYPE === '0') {
        const transaction: Transaction = {
          exchange: data.M,
          coin: data.FSYM,
          price: data.P,
          amount: data.Q
        }
        console.log(`${transaction.exchange}: ${transaction.amount} ${transaction.coin} for $${transaction.price}`);
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage])

  // React to the state of the WebSocket connection
  // and just log it to the console for now
  useEffect(() => {
    console.log('Connection is', readyState === ReadyState.OPEN ? 'ACTIVE' : 'INACTIVE')
  }, [readyState])
  
  return (
    <>
      <Canvas />
      <Menu />
    </>
  );
}

export default App;

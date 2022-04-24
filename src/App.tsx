import './App.css';
import Canvas from './components/Canvas/Canvas';
import Menu from './components/Menu/Menu';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useEffect, useState } from 'react';
import { Transaction } from './models/transaction';
import { MenuOption } from './models/menu-option';
import { useAppDispatch } from './hooks';
import { addTransaction, clearTransactions } from './state/transactionsSlice';
import { Guid } from 'typescript-guid';

function App() {
  const [active, setActive] = useState(true)
  const [coins, setCoins] = useState([])
  const [currency, setCurrency] = useState('')
  const [exchanges, setExchanges] = useState([])
  const [exchange, setExchange] = useState('')
  const [subscription, setSubscription] = useState('')
  const [counter, setCounter] = useState(0)
  const dispatch = useAppDispatch()

  // Initiate WebSocket connection
  const wsBase = process.env.REACT_APP_WS_BASE_URL
  const apiKey = process.env.REACT_APP_API_KEY
  const {
    lastMessage,
    sendMessage,
    readyState
  } = useWebSocket(`${wsBase}?api_key=${apiKey}`)

  const isConnectionActive = () => readyState === ReadyState.OPEN

  useEffect(() => {
    // Retrieve top crypto coins
    fetch(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const coins = data.Data.map((d: any) => ({
          value: d.CoinInfo.Name,
          label: d.CoinInfo.FullName
        } as MenuOption))
        setCoins(coins)
      })

    // Retrieve top exchanges
    fetch(`https://min-api.cryptocompare.com/data/top/exchanges?fsym=BTC&tsym=USD&limit=10&api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const exchanges = data.Data.map((d: any) => ({
          value: d.exchange,
          label: d.exchange
        } as MenuOption))
        setExchanges(exchanges)
      })
  }, [])

  // React to the state of the WebSocket connection
  useEffect(() => {
    console.log('Connection is', readyState === ReadyState.OPEN ? 'ACTIVE' : 'INACTIVE')
  }, [readyState])

  // Respond to new messages coming in from the data provider
  useEffect(() => {
    if (active && lastMessage) {
      const data = JSON.parse(lastMessage.data)

      // If the welcome message is received, the app is ready
      // to request trade updates over the socket
      if (data?.MESSAGE === 'STREAMERWELCOME' && exchange.length > 0 && currency.length > 0) {
        console.log('subscribing to trades...')
        const newSub = `0~${exchange}~${currency}~USD`
        var subRequest = {
          "action": "SubAdd",
          "subs": [newSub]
        };
        sendMessage(JSON.stringify(subRequest))
        setSubscription(newSub)
      }

      // If the app receives a trade update,
      // create a Transaction and log it to the console for now
      else if (data?.TYPE === '0') {
        const transaction: Transaction = {
          id: Guid.create().toString(),
          exchange: data.M,
          coin: data.FSYM,
          price: data.P,
          amount: data.Q
        }

        if (counter % 20 === 0) {
          dispatch(addTransaction(transaction))
        }
        setCounter(counter + 1)

      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage])

useEffect(() => {
  if (isConnectionActive() && subscription !== '') {

    // Check if it actually changed
    const newSub = `0~${exchange}~${currency}~USD`
    if (subscription !== newSub) {
      // Remove current subscription
      const removeSubRequest = {
        "action": "SubRemove",
        "subs": [subscription]
      };
      sendMessage(JSON.stringify(removeSubRequest))

      // Add new subscription
      const addSubRequest = {
        "action": "SubAdd",
        "subs": [newSub]
      };
      sendMessage(JSON.stringify(addSubRequest))
      setSubscription(newSub)
      console.log('SUBSCRIPTION CHANGED FROM', subscription, 'TO', newSub)

      // Clear all transactions
      dispatch(clearTransactions())
    }

  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [currency, exchange])

const onCurrencyChanged = (currency: string) => {
  setCurrency(currency)
}

const onExchangeChanged = (exchange: string) => {
  setExchange(exchange)
}

const reload = () => {
  window.location.reload()
}

return (
  <>
    <Canvas
      connectionError={isConnectionActive() ? undefined : readyState}
      reconnect={reload}
    />
    <Menu
      active={isConnectionActive()}
      coins={coins}
      exchanges={exchanges}
      currencyChanged={onCurrencyChanged}
      exchangeChanged={onExchangeChanged}
    />
  </>
);
}

export default App;

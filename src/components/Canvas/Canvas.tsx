import './Canvas.css';
import TransactionBubble from '../TransactionBubble/TransactionBubble';
import { useState } from 'react';
import { Transaction } from '../../models/transaction';

function Canvas() {
    const [nextKey, setNextKey] = useState(0)
    const [transactions, setTransactions] = useState({} as {[key: string]: Transaction})

    const deleteBubble = (key: string) => {
        if (Object.keys(transactions).includes(key)) {
            delete transactions[key]
        }
        setTransactions({...transactions})
    }

    const addTransaction = () => {
        const min = 0.00001
        const max = 0.1
        const random = Math.random()
        const randAmount = min + ((max-min) * random)
        transactions[nextKey.toString()] = {
            amount: Number.parseFloat(randAmount.toFixed(6)),
            coin: 'BTC',
            exchange: 'Coinbase',
            price: 45000
        }
        setTimeout(() => deleteBubble(nextKey.toString()), 25000)
        setNextKey(nextKey + 1)
    }

    return (
        <div className='w-screen h-screen bg-coolgray400'>
            <div className={`absolute bottom-2 left-2 w-32 h-16 z-50
                rounded-full bg-coolgray50 drop-shadow hover:drop-shadow-lg cursor-pointer noselect
                center flex place-items-center justify-center`}
                onClick={addTransaction}>
                Spawn Bubble
            </div>
            <div className='absolute bottom-2 right-2'>
                <span className='text-2xl'>{ Object.keys(transactions).length }</span>
            </div>
            {Object.entries(transactions).map(([key, transaction]) => (
                <TransactionBubble key={key} transaction={transaction} />
            ))}
        </div>
    );
}

export default Canvas;
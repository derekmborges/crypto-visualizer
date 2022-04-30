import './Canvas.css'
import { ReadyState } from 'react-use-websocket';
import { IconContext } from 'react-icons';
import { VscRefresh } from 'react-icons/vsc';
import { Transaction } from '../../models/transaction'
import useWindowDimensions from '../../utils/getWindowDimensions'
import Bubble2 from '../Bubble/Bubble2';
import { useAppSelector } from '../../hooks';

function Canvas({
    connectionError = undefined as ReadyState | undefined,
    reconnect = () => {}
}) {
    const { height, width } = useWindowDimensions()
    const transactions = useAppSelector((state) => state.transactions.value)

    return connectionError === undefined || connectionError === ReadyState.CONNECTING
        ? <div className='w-screen h-screen bg-coolgray400'>
            {transactions.map((t: Transaction, i: number) =>
                <Bubble2
                    key={i}
                    id={t.id}
                    canvasWidth={width}
                    canvasHeight={height}
                    amount={t.amount}
                    coin={t.coin}
                />
            )}
        </div>
        : <div className='w-screen h-screen bg-coolgray400 flex flex-col place-items-center justify-center'>
            <h1 className='text-xl font-bold text-coolgray100'>Something went wrong...</h1>
            <div className='w-12 h-12 m-3 rounded-full flex place-items-center justify-center cursor-pointer bg-coolgray500 drop-shadow-lg'
                onClick={reconnect}>
                <IconContext.Provider value={{ color: 'white' }}>
                    <VscRefresh className='w-8 h-8' />
                </IconContext.Provider>
            </div>
        </div>
}

export default Canvas
import { useState } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './Menu.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(3),
      minWidth: 250
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const coins = [
    { label: 'Bitcoin', value: 'BTC' },
    { label: 'Etherium', value: 'ETH' },
    { label: 'Dogecoin', value: 'DOGE' },
]

const exchanges = [
    { label: 'Coinbase', value: 'Coinbase' },
    { label: 'Binance', value: 'Binance' }
]

function Menu({ currencyChanged = (value: string) => {}, exchangeChanged = (value: string) => {} }) {
    const classes = useStyles();
    const [showing, setShowing] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(coins[0].value);
    const [selectedExchange, setSelectedExchange] = useState(exchanges[0].value);

    const toggleMenu = () => {
        setShowing(!showing);
    }

    const coinSelected = (event: any) => {
        const newValue = event.target.value
        setSelectedCoin(newValue)
        currencyChanged(newValue)
    }

    const exchangeSelected = (event: any) => {
        const newValue = event.target.value
        setSelectedExchange(newValue)
        exchangeChanged(newValue)
    }

    return (
        <>
            {showing &&
                <div className='absolute top-1.5 left-1.5 w-80 h-64 z-50'>
                    <div
                        className={`menu
                        w-80 h-64 overflow-hidden py-4 text-xl font-semibold
                        bg-coolgray50 drop-shadow-lg rounded flex flex-col items-center content-center`}>
                        <h1>Menu</h1>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="coin-label">Cryptocurrency</InputLabel>
                            <Select
                                labelId="coin-label"
                                value={selectedCoin}
                                onChange={coinSelected}
                                label="Cryptocurrency"
                            >
                                {coins.map((coin, i) => (
                                    <MenuItem key={i} value={coin.value}>{coin.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="exchange-label">Exchange</InputLabel>
                            <Select
                                labelId="exchange-label"
                                value={selectedExchange}
                                onChange={exchangeSelected}
                                label="Exchange"
                            >
                                {exchanges.map((exchange, i) => (
                                    <MenuItem key={i} value={exchange.value}>{exchange.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            }

            {/* Menu toggle */}
            <div className={`absolute top-1.5 left-1.5 w-12 h-12 z-50
                rounded flex place-items-center justify-center cursor-pointer
                ${showing ? 'bg-coolgray100 border border-gray200 rounded-tr-none rounded-bl-none' : 'bg-coolgray50 drop-shadow-lg'}`}
                onClick={toggleMenu}>
                {showing
                    ? <IoClose className='w-6 h-6' />
                    : <HiOutlineMenu className='w-6 h-6' />
                }
            </div>
        </>

    );
}

export default Menu;
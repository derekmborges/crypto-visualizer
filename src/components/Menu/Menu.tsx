import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { HiOutlineMenu } from 'react-icons/hi';
import { FaCheckCircle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './Menu.css';
import { MenuOption } from '../../models/menu-option';

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

function Menu({
    active = false,
    coins = [] as MenuOption[],
    exchanges = [] as MenuOption[],
    currencyChanged = (_: string) => {},
    exchangeChanged = (_: string) => {}
}) {
    const classes = useStyles();
    const [showing, setShowing] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState('');
    const [selectedExchange, setSelectedExchange] = useState('');

    useEffect(() => {
        if (coins.length > 0 && selectedCoin.length === 0) {
            setSelectedCoin(coins[0].value)
            currencyChanged(coins[0].value)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCoin, coins])

    useEffect(() => {
        if (exchanges.length > 0 && selectedExchange.length === 0) {
            setSelectedExchange(exchanges[0].value)
            exchangeChanged(exchanges[0].value)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedExchange, exchanges])

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
                <div className='absolute top-1.5 left-1.5 w-80 h-72 z-50'>
                    <div
                        className={`menu
                        w-80 h-72 overflow-hidden py-4 text-xl font-semibold
                        bg-coolgray50 drop-shadow-lg rounded`}>
                        <h1 className='w-full text-center'>Menu</h1>

                        <div className='flex flex-col items-center content-center'>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="coin-label">Top Cryptocurrencies</InputLabel>
                                <Select
                                    labelId="coin-label"
                                    value={selectedCoin}
                                    onChange={coinSelected}
                                    label="Top Cryptocurrencies"
                                >
                                    {coins.map((coin, i) => (
                                        <MenuItem key={i} value={coin.value}>{coin.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="exchange-label">Top Exchanges</InputLabel>
                                <Select
                                    labelId="exchange-label"
                                    value={selectedExchange}
                                    onChange={exchangeSelected}
                                    label="Top Exchanges"
                                >
                                    {exchanges.map((exchange, i) => (
                                        <MenuItem key={i} value={exchange.value}>{exchange.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </div>
                        <div className='mt-6'>
                            {active ? (
                                <div className='connection-status'>
                                    <IconContext.Provider value={{ color: 'green' }}>
                                        <FaCheckCircle className='w-6 h-6' />
                                    </IconContext.Provider>
                                    <h4 className='pl-2 text-sm leading-6 text-coolgray500' dangerouslySetInnerHTML={{__html: 'Connected'}}></h4>
                                </div>
                            ) : (
                                <div className='connection-status'>
                                    <IconContext.Provider value={{ color: 'red' }}>
                                        <AiOutlineInfoCircle className='w-6 h-6' />
                                    </IconContext.Provider>
                                    <h4 className='pl-2 text-sm leading-6 text-coolgray500' dangerouslySetInnerHTML={{__html: 'Disconnected'}}></h4>
                                </div>
                            )}
                        </div>
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
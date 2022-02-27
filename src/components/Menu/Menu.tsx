import { useState } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import './Menu.css';

function Menu() {
    const [showing, setShowing] = useState(false);

    const toggleMenu = () => {
        setShowing(!showing);
    }

    return (
        <>
            {/* Menu container */}
            {showing &&
                <div className='absolute top-1.5 left-1.5 w-80 h-64'>
                    <div
                    className={`menu
                        w-80 h-64 overflow-hidden
                        bg-coolgray50 drop-shadow-lg rounded flex place-items-center justify-center`}>
                        <h1>Menu</h1>
                </div></div>
            }

            {/* Menu toggle */}
            <div className={`absolute top-1.5 left-1.5 w-12 h-12
                rounded flex place-items-center justify-center cursor-pointer
                ${showing ? 'bg-coolgray100 border border-gray200 rounded-tr-none rounded-bl-none' : 'bg-coolgray50 drop-shadow-lg'}`}
                onClick={toggleMenu}>
                { showing
                    ? <IoClose className='w-6 h-6'/>
                    : <HiOutlineMenu className='w-6 h-6'/>
                }
            </div>
        </>
        
    );
}

export default Menu;
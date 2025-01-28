import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { CartContext } from '../store/CartContext';
import { useContext } from 'react';


export const NavigationBar = () => {

    const [bar, setBar] = useState(false);

    const cartCtx = useContext(CartContext)

    const navigate = useNavigate();

    function showCartHandler() {
        navigate('/cart')
    }

    function navBarOpen() {
        console.log("click");
        setBar(true)
    }

    function navBarClose() {
        setBar(false)
    }

    return (
        <header>
            {!bar && <span className={`sm:hidden fixed z-50 top-3 left-3 z ${!bar ? 'text-black' : 'text-white'}`}>
                <button onClick={navBarOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16"><path fill="currentColor" d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75m0 4A.75.75 0 0 1 2.75 7h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 7.75m0 4a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75" /></svg>
                </button>
            </span>}
            {bar && <span className={`sm:hidden fixed z-50 top-3 left-3 z ${!bar ? 'text-black' : 'text-white'}`}>
                <buton onClick={navBarClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" /></svg>
                </buton>
            </span>
            }
            <nav className={`w-4/5 relative mx-auto flex items-center justify-between p-5 bg-black rounded-full mt-5 max-sm:flex-col max-md:items-end max-md:w-full max-md:rounded-none max-md:mt-0 max-sm:fixed max-sm:-top-52 ${bar ? 'max-sm:top-0' : ' '} `}>
                <h1 className='text-yellow-500 text-2xl font-semibold'>Vatsalya</h1>
                <ul className='flex items-center max-sm:flex-col'>
                    <li className='mx-5 text-white hover:text-yellow-500'><Link to="/">Home</Link></li>
                    <li className='mx-5 text-white hover:text-yellow-500'><Link to="/about">About Us</Link></li>
                    <li className='mx-5 text-white hover:text-yellow-500'><Link to="/shop">Shop</Link></li>
                </ul>
                <div className='flex items-center'>
                    <motion.button initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, stiffness: 500 }} className='ml-5 px-5 py-1 bg-yellow-500 text-black text-md rounded-full flex gap-3 justify-center items-center' onClick={showCartHandler}>Cart <p className='w-5 h-5 flex items-center justify-center rounded-full bg-white'>{cartCtx.items.length}</p></motion.button>
                </div>
            </nav>
            <Outlet />
        </header>
    )
}

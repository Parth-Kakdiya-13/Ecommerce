import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { motion, spring } from 'framer-motion'

export const NavigationBar = () => {
    return (
        <header>
            <nav className='w-4/5 mx-auto flex items-center justify-between p-5 bg-black rounded-full mt-5'>
                <h1 className='text-yellow-500 text-2xl font-semibold'>Vatsalya</h1>
                <ul className='flex items-center'>
                    <li className='mx-5 text-white hover:text-yellow-500'><Link to="/">Home</Link></li>
                    <li className='mx-5 text-white hover:text-yellow-500'><Link to="/about">About Us</Link></li>
                    <li className='mx-5 text-white hover:text-yellow-500'><Link to="shop">Shop</Link></li>
                </ul>
                <div className='flex items-center'>
                    <motion.button initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, stiffness: 500 }} className='ml-5 px-5 py-1 bg-yellow-500 text-black text-md rounded-full flex gap-3 justify-center items-center'>Cart <p className='w-5 h-5 flex items-center justify-center rounded-full bg-white'>{0}</p></motion.button>
                </div>
            </nav>
            <Outlet />
        </header>
    )
}

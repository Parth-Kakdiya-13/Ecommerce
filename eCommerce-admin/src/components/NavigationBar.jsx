import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export const NavigationBar = () => {
    return (
        <header className=''>
            <nav className='bg-black p-5 text-white'>
                <ul className='flex items-center justify-center'>
                    <li className='mx-5'>
                        <NavLink to="/" className={({ isActive }) => isActive ? "text-red-500" : undefined} end>Home</NavLink>
                    </li>
                    <li className='mx-5'>
                        <NavLink to="/addproduct" className={({ isActive }) => isActive ? "text-red-500" : undefined}>Add Product</NavLink>
                    </li>
                    <li className='mx-5'>
                        <NavLink to="/listedproducts" className={({ isActive }) => isActive ? "text-red-500" : undefined}>Listed Product</NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </header>
    )
}

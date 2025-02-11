import React from 'react';
import necless from '../assets/product0.webp'
import { Services } from './Services';
import { Products } from './Products';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {

    const navigate = useNavigate();

    function navigateShop() {
        navigate('/shop')
    }

    return (
        <div>
            <div className='flex items-center justify-center gap-36 max-[1085px]:gap-20 max-sm:flex-col-reverse max-md:mt-16'>
                <div className='max-md:text-center'>
                    <p className='text-yellow-500 text-xl font-semibold'>A watch is a portable</p>
                    <h1 className='text-6xl py-5 max-md:text-4xl'>Smart Diamond<br /> Minimal Store</h1>
                    <p className='text-md'>Experienve your dacible like your deservs to. Safe for<br /> the ears, very for the heart, A treat you your years</p>
                    <button className='px-5 py-2 text-xl rounded-full bg-black text-yellow-500 mt-10' onClick={navigateShop}>Explore more</button>
                </div>
                <img src={necless} className='max-md:w-1/3 max-sm:w-1/2' />
            </div>
            <Services />
            <Products />
        </div>
    )
}

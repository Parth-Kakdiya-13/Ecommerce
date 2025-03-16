import React from 'react';
import necless from '../assets/product0.webp'
import { Services } from './Services';
import { Products } from './Products';
import { useNavigate } from 'react-router-dom';
import { Headings } from '../components/Headings';
import { Button } from '../components/Button';

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
                    <div className='mt-10'>
                        <Button className=' ' onClick={navigateShop}>Explore more</Button>
                    </div>
                </div>
                <img src={necless} className='max-md:w-1/3 max-sm:w-1/2' />
            </div>
            <Headings caption="Get awome services" heading="Our Services" classes="mt-10" />
            <Services />
            <Products />
        </div>
    )
}

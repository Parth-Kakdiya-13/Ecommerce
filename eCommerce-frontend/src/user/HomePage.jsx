import React from 'react';
import necless from '../assets/product0.webp'
import { Services } from './Services';
import { Products } from './Products';
import { useNavigate } from 'react-router-dom';
import { Headings } from '../components/Headings';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';

export const HomePage = () => {

    const navigate = useNavigate();

    function navigateShop() {
        navigate('/shop')
    }

    // const openWhatsApp = () => {
    //     window.open("https://wa.me/9664642952?text=Hello,%20I%20am%20interested!", "_blank");
    // };


    return (
        <div>
            <motion.div initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }} className='flex items-center justify-center gap-36 max-[1085px]:gap-20 max-sm:flex-col-reverse max-md:mt-16'>
                <div className='max-md:text-center'>
                    <p className='text-yellow-500 text-4xl md:text-6xl font-semibold'>Abhishek Sales</p>
                    <h1 className='py-5 text-2xl md:text-4xl'>Deals in : Imitation Raw Material & Jewellery</h1>
                    <p className='text-md'>Imitation Raw Material & Jewellery</p>
                    <div className='mt-10'>
                        <Button className=' ' onClick={navigateShop}>Explore more</Button>
                        {/* <button onClick={openWhatsApp}>
                            Message on WhatsApp
                        </button> */}
                    </div>
                </div>
                <motion.img initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }} src={necless} className='max-md:w-1/3 max-sm:w-1/2' />
            </motion.div>
            <Headings caption="Get awome services" heading="Our Services" />
            <Services />
            <Products />
        </div>
    )
}

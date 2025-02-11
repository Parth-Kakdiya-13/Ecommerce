import React from 'react'
import dilivery from '../assets/delivery_small.avif'
import support from '../assets/technical-support_small.avif'
import lock from '../assets/padlock_small.avif'
import moneyback from '../assets/money-back-guarantee_small.avif'


export const Services = () => {
    const h2class = "text-lg font-semibold"
    const pcass = "text-md text-gray-500"
    return (
        <div className='flex gap-10 items-center justify-center p-10 mt-10 max-sm:flex-col'>
            <div className='flex items-center gap-5 max-lg:flex-col max-lg:text-center'>
                <img className='w-16 h-16' src={dilivery} />
                <div className='max-sm:text-center'>
                    <h2 className={h2class}>Free Shipping
                    </h2>
                    <p className={pcass}>Product are free shipping

                    </p>
                </div>
            </div>
            <div className='flex items-center gap-5 max-lg:flex-col max-lg:text-center'>
                <img className='w-16 h-16' src={support} />
                <div className='max-sm:text-center'>
                    <h2 className={h2class}>Support 24/7
                    </h2>
                    <p className={pcass}>Support 24 hours a day

                    </p>
                </div>
            </div>
            <div className='flex items-center gap-5 max-lg:flex-col max-lg:text-center'>
                <img className='w-16 h-16' src={lock} />
                <div className='max-sm:text-center'>
                    <h2 className={h2class}>Secure Payment
                    </h2>
                    <p className={pcass}>We ensure secure payment</p>
                </div>
            </div>
            <div className='flex items-center gap-5 max-lg:flex-col max-lg:text-center'>
                <img className='w-16 h-16' src={moneyback} />
                <div className='max-sm:text-center'>
                    <h2 className={h2class}>100% Moneyback
                    </h2>
                    <p className={pcass}>Most product are free shipping.</p>
                </div>
            </div>
        </div>
    )
}

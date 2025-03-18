import React from 'react';
import earinmodal from "../assets/model/earings.webp";
import braclet from '../assets/model/braclet.webp'
import { Headings } from '../components/Headings';
import { motion } from 'framer-motion';

export const About = () => {

    let paragraph = "text-gray-500 mt-5"
    let headings = "text-xl font-semibold"


    return (
        <div className='mt-10 md:mt-0'>
            <motion.div initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}>
                <Headings caption="we are beleive in our customer satisfaction" heading="About Us" />
            </motion.div>
            <div className='flex justify-center gap-10 items-center px-20 max-[1100px]:flex-col'>
                <motion.img initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }} src={earinmodal} alt="" className='w-3/6 max-[1100px]:w-full  rounded-md' />

                <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }} className='flex min-[1100px]:flex-col max-md:flex-col gap-5'>
                    <div>
                        <h2 className={headings}>Hoop Earrings Collection</h2>
                        <p className={paragraph}>
                            Featuring elegant gold and silver hoop earrings, this collection offers a variety of styles from minimalistic designs to bold, statement-making hoops. Perfect for every occasion, these earrings are available in 14K gold, sterling silver, and some pieces embellished with diamonds for an extra touch of sparkle. Whether you want something subtle or more eye-catching, this collection has a perfect pair for you.

                        </p>
                        <p className='text-yellow-500 font-thin'>Materials: 14K Gold, Sterling Silver, Diamonds</p>
                    </div>
                    <div>
                        <h2 className={headings}>Chandelier Earrings Collection</h2>
                        <p className={paragraph}>
                            This opulent collection of chandelier earrings combines gold and silver with shimmering diamonds and precious gemstones. Designed to capture attention, these earrings feature intricate designs that dangle gracefully, making them the perfect statement piece for formal occasions. The diamond accents and gemstone inlays add a luxurious touch to these elegant earrings.
                        </p>
                        <p className='text-yellow-500 font-thin'> Materials: Gold, Silver, Diamonds, Gemstones</p>
                    </div>
                </motion.div>
            </div>
            <motion.div className='flex justify-center gap-10 items-center px-20 max-[1100px]:flex-col-reverse mt-20'>
                <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }} className='flex min-[1100px]:flex max-md:flex gap-5'>
                    <div>
                        <h2 className={headings}> Diamond Bracelets Collection</h2>
                        <p className={paragraph}>
                            Our diamond bracelets collection features exquisite pieces crafted from 14K gold, 18K white gold, or platinum. Each bracelet is adorned with brilliant diamonds in various cuts, creating a stunning piece that can be worn daily or for special occasions. The delicate yet bold designs range from single-diamond cuffs to intricate link bracelets, offering a perfect balance of luxury and style.
                        </p>
                        <p className='text-yellow-500 font-thin'>Materials: 14K Gold, 18K White Gold, Platinum, Diamonds</p>
                    </div>
                </motion.div>
                <motion.img initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }} src={braclet} alt="" className='w-3/6 max-[1100px]:w-full  rounded-md' />
            </motion.div>
        </div>
    )
}

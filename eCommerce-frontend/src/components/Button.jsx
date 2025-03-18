import { motion } from 'framer-motion'
import React from 'react'

export const Button = ({ children, className, onClick }) => {
    return (
        <motion.button initial={{ scale: 1 }} whileHover={{ scale: 1.2 }} className={`w-fit bg-gradient-to-r from-amber-200 to-yellow-600 px-5 py-1 text-md rounded-full mt-auto ${className}`} onClick={onClick}>
            {children}
        </motion.button>
    )
}


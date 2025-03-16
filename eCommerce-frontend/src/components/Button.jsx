import React from 'react'

export const Button = ({ children, className, onClick }) => {
    return (
        <button className={`w-fit bg-gradient-to-r from-amber-200 to-yellow-600 px-5 py-1 text-md rounded-full mt-auto ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}


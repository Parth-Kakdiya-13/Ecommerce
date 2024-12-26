import React from 'react'

export const Button = ({ children }) => {
    return (
        <button className='w-fit bg-black px-5 py-1 text-md text-yellow-500 rounded-full mt-5'>{children}</button>
    )
}

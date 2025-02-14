import React from 'react'

export const Headings = ({ caption, heading, classes }) => {
    return (
        <div className={`${classes} py-20`}>
            <h2 className='uppercase text-yellow-500 text-center'>{caption}</h2>
            <h1 className='capitalize text-5xl font-thin text-center'>{heading}</h1>
        </div>)
}

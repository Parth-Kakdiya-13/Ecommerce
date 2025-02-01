import React from 'react'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {


    const navigate = useNavigate()


    function navigateHandler() {
        navigate("/addproduct")
    }
    return (
        <div className='flex items-center justify-center mt-52'>
            <button onClick={navigateHandler} className='px-5 py-2 rounded-lg bg-black text-white'>Add Product</button>
        </div>
    )
}

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Button } from './Button';
import { CartContext } from '../store/CartContext';
import { useNavigate } from 'react-router-dom';

export const ListedProducts = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const ctx = useContext(CartContext)

    function addItemsToCart(list) {
        ctx.addItems(list);
        navigate('/cart');
    }


    useEffect(() => {
        async function getDataHandler() {
            try {
                const response = await axios.get('https://ecommerce-o1ub.vercel.app/retrive')
                setData(response.data.data)

            } catch (err) {
                setError(err)
            }

        }
        getDataHandler()
    }, [])


    return (
        <div className='mt-10'>
            {error && <p>{error}</p>}
            <div className="flex flex-wrap gap-4 mx-10 justify-center">
                {error && <p className='text-red-500'>{error}</p>}
                {data.length > 0 ? (
                    data.map((list, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-start border p-4 rounded shadow-md w-fit h-fix"
                        >
                            {list.image ? (
                                <img
                                    src={`data:image/jpeg;base64,${list.image}`}
                                    alt={list.title}
                                    className="w-48 h-48 object-cover mb-4"
                                />
                            ) : (
                                <p className="text-gray-500">No image available</p>
                            )}
                            <div className='flex flex-col items-start w-full h-full p-4'>
                                <h2 className="font-semibold">{list.title}</h2>
                                <p className='capitalize  w-48'>{list.description}</p>
                                <p className="text-green-600 font-bold py-2">Rs.{list.price}</p>
                                <Button className="capitalize" onClick={() => addItemsToCart(list)}>add to cart</Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>
        </div>
    )
}
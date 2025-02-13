import React, { useEffect, useState, useContext } from 'react';
import API from '../API/api'
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
                const response = await API.get('/retrive');
                setData(response.data.data)
            } catch (err) {
                setError(err)
            }

        }
        getDataHandler()
    }, [])


    return (
        <div className='mt-20 sm:mt-10'>
            <h1 className='text-center text-3xl'>Products</h1>
            {error && <p>{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-5   mt-10">
                {data.length > 0 ? (
                    data.map((list, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-start border rounded shadow-md w-fix h-fix max-sm:w-fit max-sm:mx-auto"
                        >
                            {list.image ? (
                                <img
                                    src={`data:image/jpeg;base64,${list.image}`}
                                    alt={list.title}
                                    className="w-full h-48 object-cover mb-4"
                                />
                            ) : (
                                <p className="text-gray-500">No image available</p>
                            )}
                            <div className='flex flex-col items-start w-full h-full p-4'>
                                <h2 className="font-semibold capitalize">{list.title}</h2>
                                <p className='capitalize w-48'>{list.description}</p>
                                <p className="text-green-600 font-bold py-2">Rs. {list.price}</p>
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
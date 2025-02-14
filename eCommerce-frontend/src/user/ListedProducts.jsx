import React, { useEffect, useState, useContext } from 'react';
import API from '../API/api'
import { Button } from '../components/Button';
import { CartContext } from '../store/CartContext';
import { useNavigate } from 'react-router-dom';
import loading from '../assets/loading.gif'

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
                    <div className='bg-black text-white  bg-opacity-50 flex justify-center place-self-center w-full h-screen fixed top-0 left-0 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle></svg>
                    </div>
                )}
            </div>

        </div>
    )
}
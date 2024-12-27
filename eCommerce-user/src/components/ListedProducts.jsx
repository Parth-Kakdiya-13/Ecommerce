import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from './Button';

export const ListedProducts = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState('')

    useEffect(() => {
        async function getDataHandler() {
            try {
                const response = await axios.get('https://ecommerce-w2el.vercel.app/retrive')
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
            <div className="flex flex-wrap gap-4 mx-10">
                {data.length > 0 ? (
                    data.map((list, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-start border p-4 rounded shadow-md"
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
                            <h2 className="font-semibold">{list.title}</h2>
                            <p className='capitalize py-1 w-48'>{list.description}</p>
                            <p className="text-green-600 font-bold">${list.price}</p>
                            <Button>more details</Button>
                        </div>
                    ))
                ) : (
                    !error && <p className="text-gray-500">No items found.</p>
                )}
            </div>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ListedItems = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('https://ecommerce-w2el.vercel.app/retrive');
                setItems(response.data.data);
            } catch (err) {
                setError('Failed to fetch items');
                console.error(err);
            }
        };
        fetchItems();
    }, []);

    console.log(items);

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-wrap gap-4">
                {items.length > 0 ? (
                    items.map((list, index) => (
                        <div
                            key={index}
                            className="flex flex-col border p-4 rounded shadow-md"
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
                            <p className='w-48 capitalize'>{list.description}</p>
                            <p className="text-green-600 font-bold">${list.price}</p>
                        </div>
                    ))
                ) : (
                    !error && <p className="text-gray-500">No items found.</p>
                )}
            </div>
        </div>
    );
};

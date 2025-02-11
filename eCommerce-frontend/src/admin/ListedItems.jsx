import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const ListedItems = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('https://ecommerce-backend-navy-chi.vercel.app/retrive', {
                    withCredentials: true  // ✅ Ensures session cookies are sent
                });
                setItems(response.data.data);
            } catch (err) {
                setError('Failed to fetch items');
                console.error(err);
            }
        };
        fetchItems();
    }, [items]);




    function editHandler(id) {
        navigate(`/admin/edit/${id}`)
    }

    async function deleteHandler(id) {
        try {
            const response = await axios.delete(`https://ecommerce-backend-navy-chi.vercel.app/delete/${id}`, {
                withCredentials: true  // ✅ Ensures session cookies are sent
            });
            console.log(response);

            if (response.status == 200) {
                alert("data deleted successfully")
            } else {
                alert("data not deleted")
            }
        } catch (err) {
            alert(err)
            console.log(err);
        }
        navigate('/admin/products')
    }



    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-wrap gap-5 justify-center mt-16 sm:mt-10">
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
                            <h2 className="font-semibold capitalize">{list.title}</h2>
                            <p className='w-48 capitalize'>{list.description}</p>
                            <p className="text-green-600 font-bold">${list.price}</p>
                            <div className='flex items-center justify-between mt-auto pt-5'>
                                <button type='button' className='capitalize px-5 rounded-md bg-black text-blue-500' onClick={() => editHandler(list._id)}>Edit</button>
                                <button type='button' className='capitalize px-5 rounded-md bg-black text-red-500' onClick={() => deleteHandler(list._id)}>delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    !error && <p className="text-gray-500">No items found.</p>
                )}
            </div>
        </div>
    );
};

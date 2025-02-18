import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API/api'

export const ListedItems = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await API.get("/retrive");
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
            const response = await API.delete(`/delete/${id}`);
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
                            <p className="text-green-600 font-bold">Rs. {list.price}</p>
                            <div className='flex items-center justify-between mt-auto pt-5'>
                                <button type='button' className='capitalize px-5 rounded-md bg-black text-blue-500' onClick={() => editHandler(list._id)}>Edit</button>
                                <button type='button' className='capitalize px-5 rounded-md bg-black text-red-500' onClick={() => deleteHandler(list._id)}>delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='bg-black text-white  bg-opacity-50 flex justify-center place-self-center w-full h-screen fixed top-0 left-0 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle></svg>
                    </div>)}
            </div>
        </div>
    );
};

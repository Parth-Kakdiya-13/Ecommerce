import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../API/api'
import { CartContext } from '../store/CartContext';
import { Headings } from '../components/Headings';
import { Button } from '../components/Button';

export const Categories = () => {

    const [data, setData] = useState([]);
    const [moreDetail, setMoreDetail] = useState([])

    const { category } = useParams();

    const ctx = useContext(CartContext);

    const navigate = useNavigate();

    function addItemsToCart(list) {
        ctx.addItems(list);
        navigate('/cart');
    }

    useEffect(() => {
        async function fetchByCategory() {
            const response = await API.get(`/retrive/${category}`)
            if (response.status === 200) {
                setData(response.data.data)
                console.log("responseOK", response.data);

            } else {
                console.log("responseBad")
            }
        }
        fetchByCategory();
    }, [])

    function moreDetails(list) {
        setMoreDetail([list])
    }

    function closeBackDrop() {
        setMoreDetail([])
    }


    return (
        <div className='relative'>
            <Headings caption="category" heading={category} />
            <div className="flex flex-wrap justify-center gap-5 mx-5 relative z-30">
                {data.length > 0 ? (
                    data.map((list, index) => (
                        <div key={index}>
                            <div
                                key={index}
                                className="flex flex-col items-center border rounded shadow-md w-fix h-fix max-sm:w-fit max-sm:mx-auto relative overflow-hidden transition-all duration-700 ease-in"
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
                                <div className='w-full py-5 flex justify-center mx-5 gap-2'>
                                    <Button className="capitalize" onClick={() => moreDetails(list)}>More details</Button>
                                    <Button className="capitalize" onClick={() => addItemsToCart(list)}>Add to cart</Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-black place-self-center fixed text-3xl top-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle></svg>
                    </p>
                )}
            </div>


            {moreDetail.length > 0 ?
                <div>
                    <div className='z-40 w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 transition-all duration-200 ease-in text-white text-2xl capitalize flex flex-col-reverse justify-center items-center' onClick={closeBackDrop}></div>
                    <div className='absolute w-1/2 max-sm:w-fit h-fit z-50 bg-white rounded-xl top-20 left-1/4 max-[400px]:left-5 p-5'>
                        {moreDetail.map((list, index) => (
                            <div key={index}>
                                <div
                                    key={index}
                                    className='flex max-[780px]:flex-col'
                                >
                                    {list.image ? (
                                        <img
                                            src={`data:image/jpeg;base64,${list.image}`}
                                            alt={list.title}
                                            className="w-60 h-52 object-cover mb-4"
                                        />

                                    ) : (
                                        <p className="text-gray-500">No image available</p>
                                    )}
                                    <div className='w-full flex flex-col'>
                                        <div className='w-fit p-5 max-[780px]:p-0'>
                                            <h2 className="font-serif text-2xl capitalize">{list.title}</h2>
                                            <p className='text-gray-500 text-md py-5 capitalize'>{list.description}</p>
                                            <p className='text-green-500 text-md'>Rs. {list.price}</p>
                                        </div>
                                        <Button className="ml-auto max-[780px]:mt-5 capitalize" onClick={() => addItemsToCart(list)}>add to cart</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                : " "}
        </div >
    )
}

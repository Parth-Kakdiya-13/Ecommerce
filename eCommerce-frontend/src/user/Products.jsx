import React, { useEffect, useState } from 'react';
import API from '../API/api'
import { useNavigate } from 'react-router-dom';
import { Headings } from '../components/Headings';
import { motion } from 'framer-motion';

export const Products = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        async function getDataHandler() {
            try {
                setLoading(true)
                const response = await API.get('/retrive');
                setData(response.data.data)

            } catch (err) {
                console.log(err);

            } finally {
                setLoading(false)
            }

        }
        getDataHandler()
    }, [])

    function moreDetails() {
        navigate('/shop');
    }

    return (
        <div className='mb-20'>
            <Headings caption="exlpore the awsome" heading="Our Various Collection" />
            {loading ? (
                <p className="text-black text-3xl flex justify-center items-center h-64">
                    Loading...
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-5   mt-10">
                    {data.length > 0 ? (
                        data.map((list, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: -50 }}  // Animation starts from above with opacity 0
                                animate={{ opacity: 1, y: 0 }}    // Ends at normal position with full opacity
                                transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.1 }} // Delay for stagger effect
                                className="group flex flex-col items-center border rounded shadow-md w-fix h-fix max-sm:w-fit max-sm:mx-auto relative overflow-hidden transition-all duration-700 ease-in"
                            >
                                <div className='group-hover:top-0 w-full h-full absolute top-full  left-0  bg-gradient-to-br from-yellow-100/70 to-yellow-700/70 rounded-md transition-all duration-200 ease-in text-black text-2xl capitalize flex flex-col-reverse hover:cursor-pointer justify-center items-center' onClick={moreDetails}>{list.title}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045" /><path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0" /></g></svg>
                                </div>
                                {list.image ? (
                                    <img
                                        src={`data:image/jpeg;base64,${list.image}`}
                                        alt={list.title}
                                        className="w-full h-96 object-cover mb-4"
                                    />
                                ) : (
                                    <p className="text-gray-500">No image available</p>
                                )}
                                <div className='w-full py-5'>
                                    <h2 className="font-thin text-2xl text-center  capitalize">{list.title}</h2>
                                    {/* <Button onClick={showShopHanler}>More details</Button> */}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-black place-self-center absolute text-3xl mt-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle></svg>
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

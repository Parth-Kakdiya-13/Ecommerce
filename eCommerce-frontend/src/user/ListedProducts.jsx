import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import API from '../API/api';
import { CartContext } from '../store/CartContext';
import { useNavigate } from 'react-router-dom';
import { Headings } from '../components/Headings';

export const ListedProducts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);  // Track loading status
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const ctx = useContext(CartContext);

    useEffect(() => {
        async function getDataHandler() {
            try {
                setLoading(true);  // Set loading to true before fetching
                const response = await API.get('/retrive');
                setData(response.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);  // Set loading to false after fetching
            }
        }
        getDataHandler();
    }, []);

    function moreDetails(category) {
        navigate(`/shop/${category}`);
    }

    return (
        <div className='mt-10 md:mt-0'>
            {error && <p>{error}</p>}
            <Headings caption="Explore the Awesome" heading="Our Various Collection" />

            {/* Show Loader While Fetching */}
            {loading ? (
                <p className="text-black text-3xl flex justify-center items-center h-64">
                    Loading...
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-5">
                    {data.length > 0 ? (
                        data.map((list, index) => (
                            <motion.div
                                key={index}
                                className="group flex flex-col items-center border rounded-md shadow-md w-fix h-fit max-sm:w-fit max-sm:mx-auto relative overflow-hidden"
                                initial={{ opacity: 0, y: -50 }}  // Animation starts from above with opacity 0
                                animate={{ opacity: 1, y: 0 }}    // Ends at normal position with full opacity
                                transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.1 }} // Delay for stagger effect
                            >
                                <div
                                    className='group-hover:top-0 w-full h-full absolute top-full left-0 bg-gradient-to-br from-yellow-100/70 to-yellow-700/70 rounded-md transition-all duration-200 ease-in text-black text-2xl capitalize flex flex-col-reverse hover:cursor-pointer justify-center items-center'
                                    onClick={() => moreDetails(list.category)}
                                >
                                    More {list.title}s
                                </div>
                                {list.image ? (
                                    <img
                                        src={`data:image/jpeg;base64,${list.image}`}
                                        alt={list.title}
                                        className="w-full h-fit  mb-4"
                                    />
                                ) : (
                                    <p className="text-gray-500">No image available</p>
                                )}
                                <div className='w-full py-5'>
                                    <h2 className="font-thin text-2xl text-center capitalize">{list.title}</h2>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-black text-3xl text-center">No products available</p>
                    )}
                </div>
            )}
        </div>
    );
};

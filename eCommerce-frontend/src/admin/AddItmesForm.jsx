import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API/api'

export const AddItmesForm = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: null, // New state for image file
    });

    const [loading, setLoading] = useState(false)

    const [preview, setPreview] = useState(null); // For image preview

    // Handle input change for text fields
    const changeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle file input change for the image
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setData((prevState) => ({
                ...prevState,
                image: file, // Store the image file in the state
            }));
            setPreview(URL.createObjectURL(file)); // Generate a preview URL
        }
    };

    // Handle form submission
    const postData = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("image", data.image);

        try {
            const response = await API.post("/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                setLoading(false)
            }
            alert("Data submitted successfully!");
            navigate("/admin/products");
        } catch (error) {
            alert("Error submitting data: " + error.message);
        }
    };


    return (
        <div className='mt-32 md:mt-16 bg-gray-200 w-fit mx-auto rounded-xl p-5'>
            {loading && <div className='bg-black text-white  bg-opacity-50 flex justify-center place-self-center w-full h-screen fixed top-0 left-0 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle></svg>
            </div>}
            <form onSubmit={postData}>
                <label>Title</label>
                <input
                    type='text'
                    className='border border-black rounded-md block'
                    name='title'
                    value={data.title}
                    onChange={changeHandler}
                />
                <label>Description</label>
                <input
                    type='text'
                    className='border border-black rounded-md block'
                    name='description'
                    value={data.description}
                    onChange={changeHandler}
                />
                <label>Price</label>
                <input
                    type='number'
                    className='border border-black rounded-md block'
                    name='price'
                    value={data.price}
                    onChange={changeHandler}
                />
                <label>Category</label>
                <input
                    type='text'
                    className='border border-black rounded-md block'
                    name='category'
                    value={data.category}
                    onChange={changeHandler}
                />
                <label>Upload Image</label>
                <input
                    type='file'
                    accept='image/*'
                    className='border border-black rounded-md block'
                    onChange={handleFileChange}
                />
                {preview && (
                    <div>
                        <p>Image Preview:</p>
                        <img
                            src={preview}
                            alt='Preview'
                            className='w-40 h-40 object-cover mb-4'
                        />
                    </div>
                )}
                <button
                    className='bg-black text-white rounded-xl px-5 py-2 mt-5'
                    type='submit'
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AddItmesForm = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        title: "",
        description: "",
        price: "",
        image: null, // New state for image file
    });

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

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("image", data.image);

        try {
            await axios.post("https://ecommerce-backend-navy-chi.vercel.app/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true, // ✅ Ensure cookies (sessions) are sent
            });
            alert("Data submitted successfully!");
            navigate("/admin/products");
        } catch (error) {
            alert("Error submitting data: " + error.message);
        }
    };


    return (
        <div className='mt-20 bg-gray-200 w-fit mx-auto rounded-xl p-5'>
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

import { useEffect, useState } from 'react';
import API from '../API/api'
import { useParams, useNavigate } from 'react-router-dom';

export const EditPage = () => {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        image: null, // Store the file object
    });
    const [previewImage, setPreviewImage] = useState(null); // For previewing the uploaded image
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch the product details
    useEffect(() => {
        setLoading(true)
        const fetchItem = async () => {
            try {
                const response = await API.get(`/edit/${id}`);;
                setProduct(response.data);
                setLoading(false)
                if (response.data.image) {
                    setPreviewImage(`data:image/jpeg;base64,${response.data.image}`); // Set initial preview
                }
            } catch (err) {
                console.error('Failed to fetch product:', err);
            }
        };
        fetchItem();
    }, [id]);

    // Handle input changes
    function changeHandler(event) {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value, // Dynamically update the corresponding field
        }));
    }

    // Handle image input changes and set preview
    function imageChangeHandler(event) {
        const file = event.target.files[0];
        if (file) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                image: file, // Update image field with the selected file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Set preview image
            };
            reader.readAsDataURL(file);
        }
    }

    // Handle update
    async function editHandler() {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('title', product.title);
            formData.append('description', product.description);
            formData.append('price', product.price);
            formData.append('category', product.category);
            if (product.image) {
                formData.append('image', product.image); // Add image file if present
            }

            const response = await API.put(`/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setLoading(false)
                alert('Data updated successfully');
                navigate('/admin/products'); // Redirect after successful update
            } else {
                alert('Failed to update data');
            }
        } catch (error) {
            setLoading(false)
            console.error('Error updating product:', error);
            alert('An error occurred while updating the product');
        }
    }

    // Handle delete
    async function deleteHandler() {
        setLoading(true)
        try {
            const response = await API.delete(`/delete/${id}`);
            if (response.status === 200) {
                setLoading(false)
                alert('Data deleted successfully');
                navigate('/admin/products');
            } else {
                alert('Failed to delete data');
            }
        } catch (err) {
            console.error('Error deleting product:', err);
            alert('An error occurred while deleting the product');
        }
    }


    return (
        <div>
            {loading && <div className='bg-black text-white  bg-opacity-50 flex justify-center place-self-center w-full h-screen fixed top-0 left-0 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle></svg>
            </div>}
            <div className="flex flex-col border p-4 rounded shadow-md w-fit h-fit">
                {previewImage ? (
                    <img
                        src={previewImage}
                        alt={product.title}
                        className="w-48 h-48 object-cover mb-4"
                    />
                ) : (
                    <p className="text-gray-500">No image available</p>
                )}

                <label>
                    Title:{" "}
                    <input
                        name="title"
                        value={product.title}
                        className="border-2 my-1"
                        onChange={changeHandler}
                    />
                </label>
                <label>
                    Description:{" "}
                    <input
                        name="description"
                        value={product.description}
                        className="border-2 my-1"
                        onChange={changeHandler}
                    />
                </label>
                <label>
                    Price:{" "}
                    <input
                        name="price"
                        value={product.price}
                        className="border-2 my-1"
                        onChange={changeHandler}
                    />
                </label>
                <label>Category:{" "}
                    <input
                        type='text'
                        className="border-2 my-1"
                        name='category'
                        value={product.category}
                        onChange={changeHandler}
                    />
                </label>
                <label>
                    Image:{" "}
                    <input
                        type="file"
                        accept="image/*"
                        className="border-2 my-1"
                        onChange={imageChangeHandler}
                    />
                </label>
                <div className="flex items-center justify-between mt-auto pt-5">
                    <button
                        type="button"
                        className="capitalize px-5 rounded-md bg-black text-teal-600"
                        onClick={editHandler}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="capitalize px-5 rounded-md bg-black text-red-500"
                        onClick={deleteHandler}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

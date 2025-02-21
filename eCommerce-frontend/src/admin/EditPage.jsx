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
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch the product details
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await API.get(`/edit/${id}`);;
                setProduct(response.data);
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
                alert('Data updated successfully');
                navigate('/admin/products'); // Redirect after successful update
            } else {
                alert('Failed to update data');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('An error occurred while updating the product');
        }
    }

    // Handle delete
    async function deleteHandler() {
        try {
            const response = await API.delete(`/delete/${id}`);
            if (response.status === 200) {
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
                        className="capitalize px-5 rounded-md bg-black text-green-500"
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

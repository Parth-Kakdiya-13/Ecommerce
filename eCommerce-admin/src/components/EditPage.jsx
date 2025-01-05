import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export const EditPage = () => {

    const [product, setProduct] = useState([])
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`https://ecommerce-o1ub.vercel.app/edit/${id}`);
                console.log(response);

                setProduct(response.data)
            } catch (err) {
                // setError('Failed to fetch items');
                console.log(err);
            }
        };
        fetchItems();
    }, [id]);

    async function deleteHandler(id) {
        try {
            const response = await axios.get(`https://ecommerce-o1ub.vercel.app/delete/${id}`);
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
        navigate('/listedproducts')
    }


    return (
        <div>
            <div
                key={product._id}
                className="flex flex-col border p-4 rounded shadow-md w-fit h-fit"
            >
                {product.image ? (
                    <img
                        src={`data:image/jpeg;base64,${product.image}`}
                        alt={product.title}
                        className="w-48 h-48 object-cover mb-4"
                    />
                ) : (
                    <p className="text-gray-500">No image available</p>
                )}
                <h2 className="font-semibold">{product.title}</h2>
                <p className='w-48 capitalize'>{product.description}</p>
                <p className="text-green-600 font-bold">${product.price}</p>
                <div className='flex items-center justify-between mt-auto pt-5'>
                    <button type='button' className='capitalize px-5 rounded-md bg-black text-red-500' onClick={() => deleteHandler(product._id)}>delete</button>
                </div>
            </div>
        </div>
    )
}

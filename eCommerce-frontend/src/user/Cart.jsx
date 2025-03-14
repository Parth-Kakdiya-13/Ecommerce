import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../store/CartContext'
import { Button } from '../components/Button';
import { OrderContext } from '../store/OrderContext';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {

    const { items, addItems, removeItems, totalAmount, setShoppingCart } = useContext(CartContext);

    const { placeOrder } = useContext(OrderContext);

    const navigate = useNavigate()

    function addItemsHandler(list) {
        addItems(list)
    }

    function removeItemsHandler(id) {
        removeItems(id)
    }

    function placeOrderHandler(list, amount) {
        placeOrder(list, amount);
        navigate('/order')
        setShoppingCart([])
    }

    function cancelHandler() {
        setShoppingCart([])
    }


    return (
        <div>
            {items.length <= 0 && <p className='text-center mt-32  md:mt-5 text-xl text-gray-500'>Your cart is empty 😔 Start shopping now!</p>}
            <div className="flex gap-5 justify-center items-center max-sm:flex-col  mt-10">
                {items.map((list) => {
                    return <ul key={list._id} className='flex flex-col items-start border p-4 rounded shadow-md w-fit h-fix'>
                        <li><img src={`data:image/jpeg;base64,${list.image}`}
                            alt={list.title}
                            className="w-48 h-48 object-cover my-4" />
                        </li>
                        <li className='capitalize font-semibold'>{list.title}</li>
                        <li className='capitalize text-gray-500  py-1'>{list.description}</li>
                        <li className='text-green-600 font-bold'>Rs. {list.price}</li>
                        <li className='flex gap-2 mt-2'>
                            <li>{list.quantity}</li>
                            <button className='w-10 bg-yellow-500 rounded-xl flex items-center justify-center' onClick={() => addItemsHandler(list)}>+</button>
                            <button className='w-10 bg-yellow-500 rounded-xl flex items-center justify-center' onClick={() => removeItemsHandler(list._id)}>-</button>
                        </li>
                    </ul>
                })}
            </div>
            {items.length > 0 ? <p className='m-5 flex flex-col items-center'>
                <p className='text-xl font-mono p-2 rounded-md w-fit bg-gray-200 mb-2'>Total Price: {totalAmount}</p>
                <p className='flex gap-2'>
                    <Button onClick={() => placeOrderHandler(items, totalAmount)}>Place Order</Button>
                    <Button className="bg-gradient-to-r from-teal-400 to-yellow-200" onClick={cancelHandler}>Cancel</Button>
                </p>
            </p> : " "}
        </div>
    )
}

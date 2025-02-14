import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../store/CartContext'
import { Button } from '../components/Button';

export const Cart = () => {

    const { items, addItems, removeItems } = useContext(CartContext);
    console.log(items);

    function addItemsHandler(list) {
        addItems(list)
    }

    function removeItemsHandler(id) {
        removeItems(id)
    }


    return (
        <div>
            <h1 className='text-center text-5xl my-10 max-sm:mt-10'>Cart</h1>
            {items.length <= 0 && <p className='text-center text-gray-500 text-xl'>No Products In Cart 😒</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-5   mt-10">
                {items.map((list) => {
                    return <ul key={list._id} className='flex flex-col items-start border p-4 rounded shadow-md w-fit h-fix'>
                        <li className='capitalize font-semibold'>{list.title}</li>
                        <li className='text-green-600 font-bold py-2'>Rs. {list.price}</li>
                        <li className='capitalize text-gray-500'>{list.description}</li>
                        <li><img src={`data:image/jpeg;base64,${list.image}`}
                            alt={list.title}
                            className="w-48 h-48 object-cover my-4" /></li>
                        <li className='flex gap-2'>
                            <li>{list.quantity}</li>
                            <button className='w-10 bg-yellow-500 rounded-xl flex items-center justify-center' onClick={() => addItemsHandler(list)}>+</button>
                            <button className='w-10 bg-yellow-500 rounded-xl flex items-center justify-center' onClick={() => removeItemsHandler(list._id)}>-</button>
                        </li>
                        <li className='mt-3'><Button>Place Order</Button></li>
                    </ul>
                })}
            </div>
        </div>
    )
}

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export const SignUp = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate()

    function changeHandler(event) {
        const { name, value } = event.target;
        setData((preState) => ({
            ...preState,
            [name]: value
        }))
    }

    async function postData(event) {
        event.preventDefault();
        try {
            const response = await axios.post('https://ecommerce-o1ub.vercel.app/admin/signup', data)
            if (response.status == 200) {
                alert('SignUp Successfully')
                navigate('/admin/addProduct')
            }
            if (response.data.message) {
                navigate('/signup')
                return alert(response.data.message)
            }


        } catch (error) {
            alert('SignUP failed')
            console.log(error);
        }

    }

    console.log(data);


    return (
        <div className='mt-20 bg-gray-200 w-fit mx-auto rounded-xl p-5'>
            <form onSubmit={postData}>
                <label>Email</label>
                <input
                    type='email'
                    className='border border-black rounded-md block'
                    name='email'
                    value={data.email}
                    onChange={changeHandler}
                />
                <label>Password</label>
                <input
                    type='password'
                    className='border border-black rounded-md block'
                    name='password'
                    value={data.password}
                    onChange={changeHandler}
                />

                <button
                    className='bg-black text-white rounded-xl px-5 py-2 mt-5'
                    type='submit'
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

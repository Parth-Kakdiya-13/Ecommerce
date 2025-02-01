import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

export const Login = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const authCtx = useContext(AuthContext)


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
            const response = await axios.post('https://ecommerce-o1ub.vercel.app/retrive/admin/login', data, { withCredentials: true })
            if (response.status == 200) {
                alert('Login Successfully');
                authCtx.setIsAuthenticated(true)
                navigate('/admin/addProduct')
            }
            if (response.status == 409) {
                return alert('User Not Found')
            }
            if (response.status == 300) {
                return alert('Incorrect Password')
            }

            console.log(response.status);

        } catch (error) {
            alert('Login failed')
            console.log(error);
        }

    }



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

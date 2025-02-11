import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

export const Login = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);



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
            const response = await axios.post('https://ecommerce-backend-navy-chi.vercel.app/admin/login', data, { withCredentials: true })
            if (response.status == 200) {
                alert('Login Successfully');
                authCtx.login();
                return navigate('/admin/addProduct')
            }



        } catch (error) {
            if (error.response) {
                // Handle specific status codes
                if (error.response.status === 401) {
                    alert('User not found');
                    return navigate('/login');
                } else {
                    alert(`Login failed: ${error.response.data.message || 'Unexpected error'}`);
                }
            } else {
                alert('Network error or server is not responding.');
            }
            console.error(error);
        }

    }




    return (
        <div className='mt-20 bg-gray-200 w-fit mx-auto rounded-xl p-5'>
            <form>
                <label>Email</label>
                <input
                    type='email'
                    className='border border-black rounded-md block'
                    name='email'
                    value={data.email}
                    onChange={changeHandler}
                />
                <label className='mt-3 block'>Password</label>
                <input
                    type='password'
                    className='border border-black rounded-md block'
                    name='password'
                    value={data.password}
                    onChange={changeHandler}
                />
                <Link className='block mt-1' to="/reset">Forgot Password</Link>
                <button
                    className='bg-black text-white rounded-xl px-5 py-2 mt-5'
                    type='button'
                    onClick={postData}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

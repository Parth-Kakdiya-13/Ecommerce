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
            const response = await axios.post('http://localhost:5959/admin/signup', data);

            if (response.status === 200) {
                alert('SignUp Successfully');
                return navigate('/login');
            }

        } catch (error) {
            if (error.response) {
                // Handle specific status codes
                if (error.response.status === 409) {
                    alert('User already exists');
                    return navigate('/login');
                } else {
                    alert(`SignUp failed: ${error.response.data.message || 'Unexpected error'}`);
                }
            } else {
                alert('Network error or server is not responding.');
            }
            console.error(error);
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

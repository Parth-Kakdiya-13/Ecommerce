import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Reset = () => {

    const [data, setData] = useState({ email: '' });

    const navigate = useNavigate();

    async function postEmail(e) {
        e.preventDefault();
        const response = await axios.post('http://localhost:5959/admin/reset', data)

        if (response.status === 200) {
            navigate('/login')
            alert('Email sent to your mail id check it.');
        } else {
            alert('email not sent');

        }
    }

    function changeHandler(event) {
        const { name, value } = event.target
        setData((predate) => ({
            ...predate,
            [name]: value
        }))
    }

    return (

        <div className='mt-20 bg-gray-200 w-fit mx-auto rounded-xl p-5'>
            <form onSubmit={postEmail}>
                <label>Email</label>
                <input
                    type='email'
                    className='border border-black rounded-md block'
                    name='email'
                    value={data.email}
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

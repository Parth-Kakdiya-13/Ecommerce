import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../API/api'
export const ResetPassword = () => {

    const { token } = useParams();

    const navigate = useNavigate();

    console.log(token)

    const [data, setData] = useState({ password: '' })

    async function postEmail(e) {
        e.preventDefault();
        const response = await API.post(`/admin/reset/${token}`, data);
        console.log(response);
        if (response.status === 200) {
            navigate('/login')
            alert('password reset successfully')
        } else {
            navigate('/login')
            alert('password not reset')
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
                <label>New Password</label>
                <input
                    type='password'
                    className='border border-black rounded-md block'
                    name='password'
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

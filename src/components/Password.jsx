import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Password = () => {

    const [result, setResult] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleCheck = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/v1/pass", data);
            console.log("Response Data:", response.data);
        } catch (error) {
            console.error("Fetch error:", error.response?.data || error.message);
        }
    };

    return (
        <div className='mainContent'>
            <div className='contentInput'>
                <form action="POST" onSubmit={handleSubmit(handleCheck)} className='flex flex-col gap-2 my-2'>
                    <div className='flex flex-col gap-3'>
                        <input
                            type="password"
                            placeholder='Password to check'
                            {...register("password", { required: "Email is required" })}
                            className='border-2 border-gray-200 rounded-md px-1 py-0.5'
                            name='password' />
                    </div>
                    <div className='flex justify-center'>
                        <button type='submit' className="hover:cursor-pointer">Check</button>
                    </div>
                </form>
            </div>
            <div className='contentResult'>

            </div>
        </div>
    )
}

export default Password

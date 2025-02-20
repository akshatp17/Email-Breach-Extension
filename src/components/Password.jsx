import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Password = () => {

    const [result, setResult] = useState({ res: false, pwned: false, message: '' })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleCheck = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/v1/pass", data);
            setResult({ res: true, pwned: response.data.pwned, message: response.data.message })
            console.log(response.data)
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
                            className='border-2 border-gray-200 rounded-md px-1 py-0.5 max-w-full'
                            name='password' />
                    </div>
                    <div className='flex justify-center'>
                        <button type='submit' className="hover:cursor-pointer">Check</button>
                    </div>
                </form>
            </div>
            <div className='contentResult flex flex-col items-center text-center'>
                {result.res ?
                    <>
                        {result.pwned ? <div className='text-red-500'>Caution!</div> : <div className='text-green-500'>Secure!</div>}
                        <div className='text-xs'>
                            {result.message}
                        </div>
                    </>
                    : ""
                }
            </div>
        </div>
    )
}

export default Password

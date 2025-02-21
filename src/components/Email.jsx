import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

const Email = (props) => {

    const [result, setResult] = useState({ res: false, pwned: '', message: '' })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (props.mode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [props.mode]);

    const handleCheck = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/v1/email", data);
            console.log("Response Data:", response.data);
            setResult({ res: true, pwned: response.data.pwned, message: response.data.message })
        } catch (error) {
            console.error("Fetch error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="mainContent w-full px-4">
            <div className="contentInput">
                <form
                    action="POST"
                    onSubmit={handleSubmit(handleCheck)}
                    className="flex flex-col gap-3 my-2"
                >
                    <div className="flex flex-col gap-2">
                        <input
                            type="email"
                            placeholder="Email to check"
                            {...register("email", { required: "Email is required" })}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            name="email"
                        />
                        {errors.email && (
                            <div className="text-red-500 text-xs">{errors.email.message}</div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all shadow-md"
                        >
                            Check
                        </button>
                    </div>
                </form>
            </div>

            <div className="contentResult flex flex-col items-center text-center my-3">
                {result.res ? (
                    <>
                        {result.pwned ? (
                            <div className="text-red-600 font-semibold text-lg">⚠ Caution!</div>
                        ) : (
                            <div className="text-green-600 font-semibold text-lg">✔ Secure!</div>
                        )}
                        <div className="text-gray-600 text-xs mt-1">{result.message}</div>
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    )
}

export default Email

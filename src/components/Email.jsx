import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { handleCheck } from '../utils/handleCheck';

const Email = (props) => {

    const [result, setResult] = useState({ res: false, pwned: '', message: '' })
    const [prevEmail, setPrevEmail] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const emailInput = watch("email", "");

    useEffect(() => {
        if (props.mode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [props.mode]);

    useEffect(() => {
        if (emailInput.length < prevEmail.length) {
            setResult({ res: false, pwned: false, message: '' });
        }
        setPrevEmail(emailInput);
    }, [emailInput]);

    const checkEmail = (data) => {
        handleCheck({
            endpoint: "email",
            data,
            changeload: props.changeload,
            setResult
        });
    }

    return (
        <div className="mainContent w-full px-4">
            <div className="contentInput">
                <form
                    action="POST"
                    onSubmit={handleSubmit(checkEmail)}
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
                            className={`px-4 py-2 ${props.loading ? "bg-blue-200 hover:cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 hover:cursor-pointer"} text-white rounded-lg text-sm font-medium transition-all shadow-md`}
                            disabled={props.loading}
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
                            <div className="text-red-600 font-semibold text-lg dark:text-red-500">⚠ Caution!</div>
                        ) : (
                            <div className="text-green-600 font-semibold text-lg dark:text-green-500">✔ Secure!</div>
                        )}
                        <div className="text-gray-600 text-xs mt-1 dark:text-gray-200">{result.message}</div>
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    )
}

export default Email

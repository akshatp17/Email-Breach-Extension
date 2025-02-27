import React from 'react'
import { handleCheck } from '../utils/handleCheck';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Phishing = (props) => {

    const [result, setResult] = useState({ res: false, malicious: false, message: '' })
    const [phishmode, setPhishmode] = useState("site")

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
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

    const handleModeChange = (mode) => {
        setPhishmode(mode)
    }

    const checkPhish = (data) => {
        handleCheck({
            endpoint: "phishing",
            data,
            changeload: props.changeload,
            setResult,
            phishmode
        });
    }

    return (
        <div className="mainContent w-full px-4">
            <div className=''>
                <button
                    onClick={() => { handleModeChange("site") }}
                    className={`relative w-1/2 text-sm font-medium z-10 hover:cursor-pointer ${phishmode === "site" ? "text-black font-bold" : "text-gray-500"
                        } dark:${phishmode === "site" ? "text-white font-bold" : "text-gray-400"}`}
                >
                    Website
                </button>

                <button
                    onClick={() => { handleModeChange("mail") }}
                    className={`relative w-1/2 text-sm font-medium z-10 hover:cursor-pointer ${phishmode === "mail" ? "text-black font-bold" : "text-gray-500"
                        } dark:${phishmode === "mail" ? "text-white font-bold" : "text-gray-400"}`}
                >
                    Mail
                </button>
            </div>
            <div className="contentInput">
                <form
                    action="POST"
                    onSubmit={handleSubmit(checkPhish)}
                    className="flex flex-col gap-3 my-2"
                >
                    <div className="flex flex-col gap-2">
                        {phishmode === "site" ?
                            <input
                                type="url"
                                placeholder="Website to check"
                                {...register("url", { required: "url is required" })}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full"
                                name="url"
                            /> :
                            <input
                                type="text"
                                placeholder="Mail Content to check"
                                {...register("mailcon", { required: "content is required" })}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full"
                                name="mailcon"
                            />
                        }
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
                        {result.malicious ? (
                            <div className="text-red-600 font-semibold text-lg dark:text-red-500 ">⚠ Caution!</div>
                        ) : (
                            <div className="text-green-600 font-semibold text-lg dark:text-green-500 ">✔ Secure!</div>
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

export default Phishing

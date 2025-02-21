import { useState, useEffect } from "react"
import { motion } from "framer-motion";
import Password from "./Password"
import Email from "./Email"

function Home() {
    const [mode, setMode] = useState("email")
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };


    const handleModeChange = (mode) => {
        setMode(mode)
    }

    return (
        <>
            <div className="extensionContainer w-[250px] h-[400px] bg-white shadow-lg rounded-b-xl flex flex-col justify-start items-center py-4 px-3 border border-gray-200">

                <div className="extensionTitle font-semibold text-lg text-gray-800 text-center">
                    BreachPolice
                </div>

                <div className="extensionTitle font-semibold text-sm text-gray-600 mb-3 text-center">
                    What do you want to check?
                </div>

                <hr className='border-gray-300 w-full mb-3' />

                <div className="relative flex bg-gray-200 rounded-full p-1 w-52">
                    <motion.div
                        className="absolute bg-white rounded-full shadow-md w-1/2 h-7"
                        initial={{ x: -3, y: -4 }}
                        animate={{ x: mode === "email" ? -3 : 100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />

                    <button
                        onClick={() => handleModeChange("email")}
                        className={`relative w-1/2 text-sm font-medium z-10 ${mode === "email" ? "text-black font-bold" : "text-gray-500"
                            }`}
                    >
                        Email
                    </button>

                    <button
                        onClick={() => handleModeChange("password")}
                        className={`relative w-1/2 text-sm font-medium z-10 ${mode === "password" ? "text-black font-bold" : "text-gray-500"
                            }`}
                    >
                        Password
                    </button>
                </div>

                <hr className='border-gray-300 w-full my-3' />

                <div className="w-full flex justify-center flex-grow">
                    {mode === "email" && <Email mode={isDarkMode} />}
                    {mode === "password" && <Password mode={isDarkMode} />}
                </div>

                <button
                    onClick={toggleDarkMode}
                    className="rounded-lg bg-gray-200 p-2 dark:bg-gray-800 dark:text-white"
                >
                    Toggle Dark Mode
                </button>

            </div>
        </>

    )
}

export default Home

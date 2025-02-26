import { useState, useEffect } from "react"
import { motion } from "framer-motion";
import Password from "./Password"
import Email from "./Email"
import Phishing from "./Phishing";

function Home() {
    const [mode, setMode] = useState("email")
    const [isloading, setisLoading] = useState(false)
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

    const changeLoading = () => {
        setisLoading(!isloading)
    }

    return (
        <>
            <div className="extensionContainer w-[250px] h-[400px] bg-white shadow-lg flex flex-col justify-start items-center py-4 px-3 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                {isloading ? <div>
                    Loading
                </div> : ""}
                <div className="extensionTitle font-semibold text-lg text-gray-800 text-center dark:text-gray-200">
                    BreachPolice
                </div>

                <div className="extensionTitle font-semibold text-sm text-gray-600 mb-3 text-center dark:text-gray-400">
                    What do you want to check?
                </div>

                <hr className="border-gray-300 w-full mb-3 dark:border-gray-600" />

                <div className="relative flex bg-gray-200 rounded-full p-1 w-52 dark:bg-gray-700">
                    <motion.div
                        className="absolute bg-white rounded-full shadow-md w-1/3 h-7 dark:bg-gray-800 dark:shadow-gray-700 dark:shadow-xs"
                        initial={{ x: -3, y: -4 }}
                        animate={{ x: mode === "email" ? -3 : mode === "password" ? 65 : 134 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />

                    <button
                        onClick={() => handleModeChange("email")}
                        className={`relative w-1/2 text-sm font-medium z-10 hover:cursor-pointer ${mode === "email" ? "text-black font-bold" : "text-gray-500"
                            } dark:${mode === "email" ? "text-white font-bold" : "text-gray-400"}`}
                    >
                        Email
                    </button>

                    <button
                        onClick={() => handleModeChange("password")}
                        className={`relative w-1/2 text-sm font-medium z-10 hover:cursor-pointer ${mode === "password" ? "text-black font-bold" : "text-gray-500"
                            } dark:${mode === "password" ? "text-white font-bold" : "text-gray-400"}`}
                    >
                        Password
                    </button>

                    <button
                        onClick={() => handleModeChange("phishing")}
                        className={`relative w-1/2 text-sm font-medium z-10 hover:cursor-pointer ${mode === "phishing" ? "text-black font-bold" : "text-gray-500"
                            } dark:${mode === "phishing" ? "text-white font-bold" : "text-gray-400"}`}
                    >
                        Phishing
                    </button>
                </div>

                <hr className="border-gray-300 w-full my-3 dark:border-gray-600" />

                <div className="w-full flex justify-center flex-grow">
                    {mode === "email" && <Email mode={isDarkMode} loading={isloading} changeload={changeLoading} />}
                    {mode === "password" && <Password mode={isDarkMode} loading={isloading} changeload={changeLoading} />}
                    {mode === "phishing" && <Phishing mode={isDarkMode} loading={isloading} changeload={changeLoading} />}
                </div>

                <button
                    onClick={toggleDarkMode}
                    className="rounded-lg hover:cursor-pointer bg-gray-200 p-2 dark:bg-gray-700 dark:text-white"
                >
                    Toggle Dark Mode
                </button>
            </div>
        </>


    )
}

export default Home

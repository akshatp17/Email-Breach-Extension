import { useState } from "react"
import Password from "./components/Password"
import Email from "./components/Email"

function App() {
  const [mode, setMode] = useState("email")

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
        <div className="tabsSelect flex gap-2">
          <button
            onClick={() => handleModeChange("email")}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
          >
            Email
          </button>
          <button
            onClick={() => handleModeChange("password")}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
          >
            Password
          </button>
        </div>
        <hr className='border-gray-300 w-full my-3' />
        <div className="w-full flex justify-center">
          {mode === "email" && <Email />}
          {mode === "password" && <Password />}
        </div>
      </div>
    </>

  )
}

export default App

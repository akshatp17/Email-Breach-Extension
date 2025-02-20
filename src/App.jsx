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
      <div className="extensionContainer w-[250px] h-[300px] bg-fuchsia-50 flex flex-col justify-start items-center py-3">
        <div className="extensionTitle font-bold">
          What do you want to check?
        </div>
        <div className="tabsSelect flex gap-2">
          <button onClick={() => { handleModeChange("email") }} className="hover:cursor-pointer">Email</button>
          <button onClick={() => { handleModeChange("password") }} className="hover:cursor-pointer">Password</button>
        </div>
        {mode === "email" && (
          <Email />
        )}
        {mode === "password" && (
          <Password />
        )}
      </div>
    </>
  )
}

export default App

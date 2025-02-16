import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Home from './components/Home'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Landing /></>
    },
    {
      path: "/login",
      element: <><Login /></>
    },
    {
      path: "/register",
      element: <><Register /></>
    },
    {
      path: "/home",
      element: <><Home /></>
    },
    {
      path: "/user",
      element: <><Profile /></>
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
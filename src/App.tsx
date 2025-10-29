import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
import Main from './components/main'
import { jwtDecode } from 'jwt-decode'

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
    {token != null ? 
      <Main token={token}/>
    : 
      <Login setToken={setToken}/>
    }
    </>
  )
}

export default App

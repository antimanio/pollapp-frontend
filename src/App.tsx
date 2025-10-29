import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
import Main from './components/main'
import { jwtDecode } from 'jwt-decode'
import useSessionStorageState from 'use-session-storage-state'

function App() {
  const [token, setToken] = useSessionStorageState("token", { defaultValue: null});

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

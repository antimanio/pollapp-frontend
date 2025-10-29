import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
import Main from './components/main'
import { jwtDecode } from 'jwt-decode'
import { useCookies } from 'react-cookie'

function App() {
  const [token, setToken] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(['auth']);

  useEffect(() => {
    if(token != cookies?.auth && cookies?.auth != null && token == null) setToken(cookies?.auth);
  },[cookies]);

  useEffect(() => { 
    if(token != null) {
      if(token != cookies?.auth) setCookie("auth", token);
      if(cookies?.auth != null && token != cookies?.auth) {
        setToken(cookies?.auth)
      }
    }
  },[token]);

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

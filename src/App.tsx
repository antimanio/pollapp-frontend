import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/login'
import Main from './components/main'
//import useSessionStorageState from 'use-session-storage-state'
import { useCookies } from 'react-cookie'

function App() {
    //const [token, setToken] = useSessionStorageState("token", { defaultValue: null});
  const [token, setToken] = useState<string|null>(null);

  const [cookies, setCookie/*, removeCookie*/] = useCookies(['auth']);

  useEffect(() => {
    if(token != cookies?.auth && cookies?.auth != null && token == null) setToken(cookies?.auth);
  },[cookies]);

  useEffect(() => {
    if(token != null) {
      if(token != cookies?.auth) setCookie("auth", token);
    }
  },[token]);

  return (
    <>
    {token !== null ?
      <Main token={token} setToken={setToken}/>
    : 
      <Login setToken={setToken}/>
    }
    </>
  )
}

export default App

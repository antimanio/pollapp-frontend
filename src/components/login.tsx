import { useRef } from 'react'
import Register from './register.tsx'
import {useState} from "react";
import Main from './main'

function Login() {
  const usernameRef = useRef(null); 
  const passwordRef = useRef(null);
  const [registerState, setRegisterState] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  
  const login = () => {
    const username = usernameRef?.current?.value;
    const password = passwordRef?.current?.value;
  }

  const goToRegister = () => {
      setRegisterState(!registerState);
  }

  const goToMain = () => {
        setLoggedIn(!loggedIn);
  }

  if(registerState) {
      return <Register/>
  }

  if (loggedIn) {
        return <Main/>
  }


  return (
    <>
        <div className='loginForm'>
            <h2>Login</h2>
            <input type="text" ref={usernameRef} placeholder='Username'/>
            <input type="password" ref={passwordRef} placeholder='Password'/>
            <input type="button" onClick={goToMain} value="Login"/>
            <h4 className='clickable' onClick={goToRegister}>Register</h4>
        </div>
    </>
  )
}

export default Login

import { useRef } from 'react'
import Register from './register.tsx'
import {useState} from "react";
import Main from './main'

function Login({setToken}) {
  const usernameRef = useRef(null); 
  const passwordRef = useRef(null);
  const [registerState, setRegisterState] = useState(false);
  
  const login = () => {
    const username = usernameRef?.current?.value;
    const password = passwordRef?.current?.value;

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username,
        password
      }),
    })
    .then(response => response.text())
    .then(data => {
      console.log("estt" + data);
      setToken(data);
      //if(data["id"] != null) setToken(data);
    })
    .catch(error => console.error('Error:', error));
  }

  const goToRegister = () => {
      setRegisterState(!registerState);
  }

  if(registerState) {
      return <Register setRegisterState={setRegisterState}/>
  }


  return (
    <>
        <div className='loginForm'>
            <h2>Login</h2>
            <input type="text" ref={usernameRef} placeholder='Username'/>
            <input type="password" ref={passwordRef} placeholder='Password'/>
            <input type="button" onClick={login} value="Login"/>
            <h4 className='clickable' onClick={goToRegister}>Register</h4>
        </div>
    </>
  )
}

export default Login

import { useRef } from 'react'
import Register from './register.tsx'
import {useState} from "react";

function Login({setToken}: {setToken: (t: string | null) => void}) {
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
  const [registerState, setRegisterState] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = () => {
      setError(null);
      const username = usernameRef?.current?.value ?? "";
      const password = passwordRef?.current?.value ?? "";

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
          .then(async response => {
              const bodyText = await response.text();

              if (!response.ok) {
                  setToken(null);

                  try {
                      const errObj = JSON.parse(bodyText);
                      setError(errObj.error ?? errObj.message ?? JSON.stringify(errObj));
                  } catch {
                      setError(bodyText || response.statusText || `HTTP ${response.status}`);
                  }
                  return null;
              }
              return bodyText;
          })
          /*.then(response => response.text())*/
          .then(data => {
              if (data) {
                  setToken(data);
                  console.log("estt" + data);
              }
              /*console.log("estt" + data);
              setToken(data);
              //if(data["id"] != null) setToken(data);
               */
          })
          .catch(err => {
              setToken(null);
              console.error('Error:', err);
              setError(err?.message ?? String(err));
          });
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
            {error && <h4 style={{color: 'red'}}>{error}</h4>}
        </div>
    </>
  )
}

export default Login

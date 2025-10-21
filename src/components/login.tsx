import { useRef } from 'react'

function Login() {
  const usernameRef = useRef(null); 
  const passwordRef = useRef(null); 
  
  const login = () => {
    const username = usernameRef?.current?.value;
    const password = passwordRef?.current?.value;
  }

  const goToRegister = () => {
    // Go to register page logic
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

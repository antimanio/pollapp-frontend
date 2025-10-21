import { useRef, useState } from 'react'


function Register() {
  const [error,setError] = useState("");
  const usernameRef = useRef(null); 
  const emailRef = useRef(null); 
  const passwordRef = useRef(null); 
  const passwordRepeatRef = useRef(null); 

  const register = () => {
    setError("");

    const username = usernameRef?.current?.value;
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;
    const passwordRepeat = passwordRepeatRef?.current?.value;

    if(username.length < 1) return setError("You have to have a username");
    if(email.length < 1) return setError("You have to have a email");
    if(password.length < 1) return setError("You have to have a password");
    if(password != passwordRepeat) return setError("Your passwords does not match");

    //Register logic
  }

  return (
    <>
        <div className='loginForm'>
            <h2>Register</h2>
            <input type="text" ref={usernameRef} placeholder='Your Username'/>
            <input type="text" ref={emailRef} placeholder='Your Email'/>
            <input type="password" ref={passwordRef} placeholder='Your Password'/>
            <input type="password" ref={passwordRepeatRef} placeholder='Your Password Again'/>
            <input type="button" onClick={register} value="Register"/>
            <h4 className='clickable'>{error}</h4>
        </div>
    </>
  )
}

export default Register

import { useRef } from 'react'
import {useState} from "react";
import CreatePoll from './createpoll.tsx';
import { getUsername } from './util.tsx';

interface MainProps {
    token?: string | null;
    setToken?: (t: string | null) => void;
}

function Main({token, setToken}: MainProps) {
  const pollIdRef = useRef<HTMLInputElement | null>(null);
  const [createPollState, setCreatePollState] = useState(false);


    function clearToken(setToken: (t: string | null) => void) {
        setToken(null);                   // clears React/session-storage state
        sessionStorage.removeItem('token'); // remove from raw sessionStorage as well
    }

    const logout = () => clearToken(setToken);

  const joinPoll = () => {
    const pollId = pollIdRef?.current?.value;
    console.log(pollId)
  }

  const createPoll = () => {
    setCreatePollState(true);
  }

    if(createPollState) {
        return <CreatePoll setCreatePollState = {setCreatePollState} token = {token ?? undefined}/>
    }

  return (
    <>
        <input type="button" value="Logout" onClick={logout} />
        <div className='loginForm'>
            <h2>Welcome, {getUsername(token) ?? "Guest"}</h2>
            <input type="text" ref={pollIdRef} placeholder='Poll Id'/>
            <input type="button" onClick={joinPoll} value="Join Poll"/>
            <input type="button" onClick={createPoll} value="Create Poll"/>
        </div>
    </>
  )
}

export default Main

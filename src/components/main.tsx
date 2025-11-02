import { useRef } from 'react'
import {useState} from "react";
import CreatePoll from './createpoll.tsx';
import { getUsername, type Poll } from './util.tsx';
import PollVote from './poll.tsx';
import useSessionStorageState from 'use-session-storage-state'

interface MainProps {
    token?: string | null;
    setToken?: (t: string | null) => void;
}

function Main({token, setToken}: MainProps) {
  const pollIdRef = useRef<HTMLInputElement | null>(null);
  const [createPollState, setCreatePollState] = useState(false);
  const [poll, setPoll] = useSessionStorageState<Poll | null>("poll", {defaultValue: null,});


    function clearToken(setToken: (t: string | null) => void) {
        setToken(null);                   // clears React/session-storage state
        sessionStorage.removeItem('token'); // remove from raw sessionStorage as well
    }

    const logout = () => {if(setToken) clearToken(setToken);}

  const joinPoll = () => {
    const pollId = pollIdRef?.current?.value;
    console.log(pollId)
    fetch("http://localhost:8080/polls", {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        .then(response => response.json())
        .then(data => {
          if(pollId) {
            const pollData = data.find((p: Poll) => String(p.id) == pollId);
            if(pollData) setPoll(pollData);
          }
        })
        .catch(err => {
            console.error('Error:', err);
        });
    
  }

  const createPoll = () => {
    setCreatePollState(true);
  }

  if(poll) {
    return <PollVote poll={poll} setPoll={setPoll} token={token ?? ""}></PollVote>
  }


  if(createPollState) {
      return <CreatePoll setCreatePollState = {setCreatePollState} setPoll={setPoll} token = {token ?? undefined}/>
  }

  return (
    <>
        <input type="button" value="Logout" onClick={logout} />
        <div className='loginForm'>
            <h2>Welcome, {getUsername(token ?? "") ?? "Guest"}</h2>
            <input type="text" ref={pollIdRef} placeholder='Poll Id'/>
            <input type="button" onClick={joinPoll} value="Join Poll"/>
            <input type="button" onClick={createPoll} value="Create Poll"/>
        </div>
    </>
  )
}

export default Main

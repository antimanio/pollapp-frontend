import { useRef } from 'react'
import {useState} from "react";
import CreatePoll from './createpoll.tsx';

function Main() {
  const pollIdRef = useRef(null);
  const [createPollState, setCreatePollState] = useState(false);

  const joinPoll = () => {
    const pollId = pollIdRef?.current?.value;
    console.log(pollId)
  }

  const createPoll = () => {
    setCreatePollState(true);
  }

    if(createPollState) {
        return <CreatePoll setCreatePollState = {setCreatePollState}/>
    }

  return (
    <>
        <div className='loginForm'>
            <h2>Welcome, username</h2>
            <input type="text" ref={pollIdRef} placeholder='Poll Id'/>
            <input type="button" onClick={joinPoll} value="Join Poll"/>
            <input type="button" onClick={createPoll} value="Create Poll"/>
        </div>
    </>
  )
}

export default Main

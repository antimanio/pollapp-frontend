import { useRef } from 'react'

function Main() {
  const pollIdRef = useRef(null); 

  const joinPoll = () => {
    const pollId = pollIdRef?.current?.value;
    console.log(pollId)
  }

  const createPoll = () => {
    // Go to createPoll page logic
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

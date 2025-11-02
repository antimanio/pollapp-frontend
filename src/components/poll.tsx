import { useRef } from 'react'
import { getUsername } from './util';

function Poll({Poll, token, setPoll}) {
    const username = getUsername(token) ?? "test";
    const pollquestion = Poll.question;

    const updateVote = () => {
        fetch("http://localhost:8080/polls", {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        .then(response => response.json())
        .then(data => {
            const updateData = data.find(p => p.id == Poll.id);
            setPoll(updateData)
        })
        .catch(err => {
            console.error('Error:', err);
        });
    }

    const vote = (optionindex) => {
        // Vote logic
        console.log(username, pollquestion, optionindex)
        fetch("http://localhost:8080/votes", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                username,
                pollquestion,
                optionindex
            }),
        })
        .then(response => response.text())
        .then(data => {
            updateVote()
        })
        .catch(err => {
            console.error('Error:', err);
        });
    }
  
  const back = () => {
    // Go back to main page logic
    setPoll(null);
  }

  return (
    <>
        <div className='loginForm'>
            <div className='back'>
                <h4 className='clickable' onClick={back}>← Back</h4>
            </div>
            <h2>Poll #{Poll.id}</h2>
            <h2 className='pollQuestion'>{Poll.question}</h2>
            <div className='responseBody'>
                {Poll.voteoption.map((opt, idx) => (
                    <div key={idx} className='response clickable' title="Click me to vote for this option">
                        <div className='statement'>{opt.caption}</div>
                        <div className='statement'>Votes: {opt.vote.length}</div>
                        <input type="button" onClick={() => vote(idx)} value="Vote"/>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default Poll

import { getUsername, type Poll } from './util';

type PollVoteProps = {
  poll: Poll;
  token: string;
  setPoll: React.Dispatch<React.SetStateAction<Poll | null>>;
};

function PollVote({poll, token, setPoll}: PollVoteProps) {
    const username = getUsername(token) ?? "test";
    const pollquestion = poll?.question;

    const updateVote = () => {
        fetch("http://localhost:8080/polls", {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        .then(response => response.json())
        .then(data => {
            const updateData = data.find((p: Poll) => p.id == poll.id);
            setPoll(updateData)
        })
        .catch(err => {
            console.error('Error:', err);
        });
    }

    const vote = (optionindex: string) => {
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
        .then(() => {
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
            <h2>Poll #{poll.id}</h2>
            <h2 className='pollQuestion'>{poll.question}</h2>
            <div className='responseBody'>
                {poll.voteoption.map((opt, idx) => (
                    <div key={idx} className='response clickable' title="Click me to vote for this option">
                        <div className='statement'>{opt.caption}</div>
                        <div className='statement'>Votes: {opt.vote.length}</div>
                        <input type="button" onClick={() => vote(String(idx))} value="Vote"/>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default PollVote

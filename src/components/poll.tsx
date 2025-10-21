import { useRef } from 'react'

function Poll() {
  const vote = () => {

  }
  
  const back = () => {
    // Go back to main page logic
  }

  return (
    <>
        <div className='loginForm'>
            <div className='back'>
                <h4 className='clickable'>← Back</h4>
            </div>
            <h2>Poll #</h2>
            <h2 className='pollQuestion'>This is a example poll question</h2>
            <div className='responseBody'>
                <div className='response clickable' title="Click me to vote for this option">
                    <div className='statement'>Poll Option</div>
                    <div className='statement'>Votes: ##</div>
                </div>
                <div className='response clickable' title="Click me to vote for this option">
                    <div className='statement'>Poll Option</div>
                    <div className='statement'>Votes: ##</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Poll

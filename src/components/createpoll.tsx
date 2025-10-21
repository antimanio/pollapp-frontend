import { useRef } from 'react'

function CreatePoll() {
  const createPoll = () => {

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
            <h2>Create Poll</h2>
            <input type="text" className='pollQuestion' placeholder='Poll Caption'/>
            <h2 className='pollQuestion'>Poll Options</h2>
            <div className='pollOptions'>
                <div className='option clickable'>
                    <input type="text" placeholder='Caption'/>
                    <input type="button" value='Remove'/>
                </div>
                <div className='option clickable'>
                  <input type="text" placeholder='Caption'/>
                  <input type="button" value='Remove'/>
                </div>
            </div>
            <input type="button" value='Add Option' className='addOption'/>
            <input type="button" onClick={createPoll} value='Publish Poll'/>
        </div>
    </>
  )
}

export default CreatePoll

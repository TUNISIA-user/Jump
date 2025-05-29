import React from 'react'
import "./Desc.css"
const Desc = () => {
  return (
    <div className='Description__jump'>
      
      <div className="inside__jump">
           <div className="liveStream"><h1>Live Stream &  Chat</h1></div>
          <div className="withJump"><h1>With Jump Live, anyone can broadcast  no “follower count” thresholds needed!</h1></div>
            <div className="moreDesc">
            If you don’t feel like broadcasting, no worries, you can watch or participate in live streams as a guest.
            A great way to meet groups of people and browse what people are talking about on Jump.

            </div>

            <div className="buttonstartLive">
              <button>Start Live</button>
            </div>
      </div>
   
    </div>
  )
}

export default Desc

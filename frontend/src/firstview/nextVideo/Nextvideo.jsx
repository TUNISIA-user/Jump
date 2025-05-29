import React from 'react'
import "./newVideo.css"
import Cards from '../../Cards'
const Nextvideo = () => {
  return (
    <div className='next_video_jump'>


       <div className="swiper_jump_section">
           <div className="first_side"> <Cards/></div>
           <div className='seconde_side'>

            <div className='container__inside__card'>
              <div className='video_chat'><h1>1:1 Video Chat</h1></div>
              <div className="meeting">You  never know who you will <br/> meet in next Jump</div>
              <div className="description">Our 1:1 video chat is reliable and seamless with no-delay connections, powered by WebRTC technology, so you can meet new people anytime, anywhere.</div>
              <div className="button_start_video_chat"><button>Start Video Chat</button></div>
            </div>

           </div>
         
         </div>
 
 
    </div>
  )
}

export default Nextvideo

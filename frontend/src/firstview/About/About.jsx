import React from 'react'
import "./about.css"

const About = () => {
  return (
    <div className='film_frame'>
       
      
       <div className='screen'>
       <iframe  src="https://www.youtube.com/embed/IKwq5wz5zAk?si=fti9r197bua8aWcj" title="YouTube video player"  style={{border:"none"}}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;compute-pressure"   allowFullScreen></iframe> 
        <div className='Important_text'> "Jump is your go-to video chat platform, bringing the world right to your screen! Meet awesome people nearby or from every corner of the globe—your next conversation is just a click away!"  </div>

        <div className='Imoratnt_text_small'>
        Since its launch in 2025, Jump  has solidified itself as a leading video chat platform in the world for multiple years. With over 100 billion video chats connected globally, finding someone interesting to chat with is quick and easy-just one chat away!  
        </div>
       </div>
   
     </div>
  )
}

export default About

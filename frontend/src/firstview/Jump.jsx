import React, { startTransition, useEffect, useState } from 'react'
import Header from './Header/Header'
import "./jump.css"
import CountUp from "react-countup";
import About from './About/About';
import Nextvideo from './nextVideo/Nextvideo';
import Desc from './DescpritionLive/Desc';
import Sidex from './sidex/Sidex';
import {useGlobalContext} from "../Store/ContextProvider.jsx";

const Jump = () => {
 const [current,setcurrent] = useState(0) 
 const [originalCurrent,setoriginalCurrent] = useState(0)
 const [watch,setwatch] = useState(false)
    const {socket} = useGlobalContext()


  const HandelJump   = ()=>{
    const res = window.scrollY
    setoriginalCurrent(res)
    setcurrent(res/1000)
  }
useEffect(()=>{


  window.addEventListener("scroll",HandelJump)

  return ()=>{
    window.removeEventListener("scroll",HandelJump)
  }
},[])

useEffect(() => {
 
  if (originalCurrent >800) {
    setwatch(true);
    console.log("i watch uuu")
  }
}, [originalCurrent]); // Runs only when `originalCurrent` changes


const [start,setstart] = useState(0)
const [end,setend] = useState(0)






    useEffect(()=>{
        const HandelGetArrayUsers =(data)=>{

            setend(Object.values(data).length)
        }


        socket.on("list__of__the__author__online__in_users__connected",HandelGetArrayUsers)

        return ()=>{
            socket.off("list__of__the__author__online__in_users__connected",HandelGetArrayUsers);
        }
    },[])





    return (

    <>  
    <div className='containe_Header_jump' style={{filter:""}}>
        <Header current={current}
        watch ={watch}
        originalCurrent ={originalCurrent} open={false}/>
        
        <div className='jump_inforamtion'>
           
             <div className="logo">
              <h1>Jump</h1>
              <img   src='./first_view_images/crow.svg' alt=''/>
             </div>
                <div className="connected_users">
                  <h2>     
              <CountUp
              key={`${start}-${end}`} // This ensures re-render when numbers change
              start={start}
              end={end}
              duration={5}
              separator=","
              useEasing={true}
            />

                 </h2>
                </div>


        <div className='numbers_matches'><h2>Number  of Matches</h2></div>
                  
                  
          <div className='Button_jump'>
          <div className='App_store_button'>
            <img src='./first_view_images/apple.svg' alt=''/>
            <h4 >App Store</h4>
            </div>
            <div className='App_store_button'>
            <img src='./first_view_images/app-store.svg' alt=''/>
            <h4>App Store</h4>
            </div>

          </div>







           </div>

           
         
    
    </div>


    <div className='containe_Header_jump_black'>
 
    {originalCurrent>930  &&    <Header current={current} originalCurrent ={originalCurrent} open={true}/> }
       
      
     <About/> 
     <Nextvideo/>
     <br/>
     <Desc/>
     <br/>
     <Sidex/>

    </div>
    
     </>
  )
}

export default Jump

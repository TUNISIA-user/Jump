import React, { useEffect } from 'react'
import "./liveJump.css"
import Header from '../Header/Header'
import Souce__Camera from './Souce__Camera'
import { useGlobalContext } from '../../Store/ContextProvider'

const LiveJump = () => {
  const {socket} = useGlobalContext()
 
  
  return (
    <>     
    <div className='live__Jump'>
              <Header current={null}        watch ={null}  originalCurrent ={null} open={true}/>

              <Souce__Camera/>
    </div> 

     
    </>
  )
}

export default LiveJump

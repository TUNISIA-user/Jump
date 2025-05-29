import React, { useEffect } from 'react'
import io from "socket.io-client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Jump from './firstview/Jump';
 
import Cards from './Cards';
import LiveJump from './firstview/LiveJump/LiveJump';
import Test from './Test';
import { ContextProvider } from './Store/ContextProvider';
import Desing from './Desing';
import MainSocialMedia from "./JumpSocialMedia/MainSocialMedia.jsx";



const App = () => {

 

  return (
   
  <>

  <ContextProvider>     
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Jump/>}/>
      <Route path="/Fie" element={<Cards/>}/>
      <Route path="/videoChat" element={<LiveJump/>}/>
      <Route path="/modeDevlopper" element={<Test/>}/>
      <Route path="/fff" element={<Desing/>}/>

        <Route path="/Jump/home" element={<MainSocialMedia/>}/>

         
      
        <Route/>
      </Routes>
    </BrowserRouter>
    </ContextProvider>


  </>
  ) 
} 

export default App
 

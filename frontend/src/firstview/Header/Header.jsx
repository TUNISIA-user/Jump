import React, { useState } from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
 
const  Header = ({current,originalCurrent,open}) => {
 
 
  return (
    <div className='Header__Jump' style={{ backdropFilter: 'blur(10px)'  , background:`rgba(0,0,0,${open?0 : current})`
    ,position:"sticky",top:"0",zIndex:"2"
    
    }}> 
       
        <div className='First__Jump'>
     
          <div className='icon1'>   
          
              <img src={open?'./first_view_images/crowWhite.svg': "./first_view_images/crow.svg"} alt=''/>
              
              <Link to={"/modeDevlopper"} style={{textDecoration:"none"}} >  <h1>Jump</h1>  </Link>
          </div>  

          <div className='icon2 spe' ><Link to={"/videoChat"} style={{textDecoration:"none"}} >   <h2>VideoChat</h2>   </Link></div>

          <div className='icon2'><h2>Blog</h2></div>
          <div className='icon2'><h2>About</h2></div>




        </div>




        <div className='Second__Jump'>


          <div className='shoping'>
            <img src='https://azarlive.com/images/icons/imgGemSquare@3x.png' alt=''/>
            <h2>Shop</h2>
          </div>
          
        <div className='History'>
            <img src='./first_view_images/history.svg' alt=''/>
            <h2>History</h2>
          </div>
          <div className='Avtar'>
                 <img src='https://azarlive.com/images/profile/imgProfile@3x.png' alt=''/>
            </div>     
        </div>
      
    </div>
  )
}

export default Header

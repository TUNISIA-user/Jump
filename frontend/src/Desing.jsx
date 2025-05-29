 
import React, {useState,useEffect} from "react";
import { Tranquiluxe   } from "uvcanvas";
import CountUp from "react-countup";
import {useGlobalContext} from "./Store/ContextProvider.jsx";
const Desing = () => {
    const {socket}  = useGlobalContext()

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





    return (    <>
    <div
      style={{
        width: "49vw",
        height: "600px",
        position: "absolute",
        top: 30,
        left: 0,
        overflow: "hidden",
          borderRadius:"30px"
      }}
    >
      <Tranquiluxe   />

        <div style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight:"bold",
            fontSize: "40px",
            color:"white",
            textTransform: "capitalize",
        }}

        >


            <div style={{fontSize:"20px",backgroundColor:"e",display:"flex",flexDirection:"column"}}>

                 <div > <h1 style={{fontSize:'80px'}}>Jump</h1></div>
             <div style={{display:"flex",alignItems:"center",gap:'10px',justifyContent:"center",backgroundColor:"vv"}}>
                 <p style={{width:"10px",height:'10px',backgroundColor:'green',borderRadius:"100%",position:"relative",left:"5px"}}></p>
                 <CountUp
                     key={`${start}-${end}`} // This ensures re-render when numbers change
                     start={start}
                     end={end}
                     duration={5}
                     separator=","
                     useEasing={true}
                 />
                 <h4>are matching now ! </h4>
             </div>



            </div>
        </div>




    </div>
    

                 </>
  );
};

export default Desing;

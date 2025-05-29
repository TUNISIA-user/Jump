import React, { useEffect, useRef, useState }  from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import { useGlobalContext } from "./Store/ContextProvider";
 
const Test = () => {
  const Nav = useNavigate()
  let email= useRef()
  let password = useRef()
  const [data,setdata] = useState("")
  const [loading,setlodaing] = useState(false)
  const [onlineusers,setonlineusers] = useState([])

    const [fire,setfire]= useState([])
    const {socket,dispatch} = useGlobalContext()

 const auth  =async ()=>{
     setlodaing(true)
  try{
  const {data} =  await axios.post("http://localhost:5000/auth",{
  
      "email":email.current.value,
      "password":password.current.value
 
  })

      setlodaing(false)
      localStorage.setItem("token",JSON.stringify({token:data}))

     // dispatch({type:"add__user",payload:data})


      Nav("/videoChat")
 if(data){
  socket.emit("auth__get__user_from_frontned",{uniqueSocket:localStorage.getItem("SOCKET__ID__KEY"),Buffer : data})
 }
}catch(eroor){
  console.log("this eroor was in ",eroor)
      setlodaing(false)
}
 }
 
 useEffect(() => {
  const interval = setInterval(() => {
   
    setdata(localStorage.getItem("SOCKET__ID__KEY"));
  }, 800);

  return () => clearInterval(interval); // Cleanup the interval when component unmounts
}, []); // Runs once when the component mounts


    useEffect(() => {

        const updateUsers = (buffer) => {
            console.log("Updated list of users online:", buffer);
            setonlineusers(Object.keys(buffer).length !== 0 ? Object.values(buffer) : []);
        };

        socket.on("list__of__the__author__online__in_users__connected", updateUsers);

        return () => {
            socket.off("list__of__the__author__online__in_users__connected", updateUsers);
        };
    }, [socket]);


const getUsers =async () => {
    try{
        const {data} = await  axios.get("http://localhost:5000/clients")

        setfire(data)
    }catch (error){
        console.log(error)
    }
}

useEffect(()=>{
    getUsers()
},[])


    return (
        <>
    <div>
 <p style={{color:"red",display:"flex",gap:"10px"}}  >  <span style={{color:"black"}}>This Key </span> {data}</p>
       

       <input type='text' ref={email}/>
       <br/>       <br/>
       <input type='text' ref={password}/>
       <br/>       <br/>



       {loading ?  <CircularProgress size={20} color="primary" />:    <button onClick={()=>auth()} style={{width:"100px",padding:"4px",borderRadius:"10px",border:"1px solid black",cursor:"pointer"}}> Join</button>}
 <hr/>
 {onlineusers.map((user, index) => (
          <li key={index} style={{listStyle:"none",display:"flex",alignItems:"center",gap:"10px"}}> {user.name || "Unknown User"}  . {user.email} <h2 style={{color:"red",fontSize:"10px"}}>{user.ID}</h2></li>
        ))}


    </div>
          ---------------  <p style={{color:"green"}}>users online right now</p>

            {fire.map((item,index)=><li key={index} style={{listStyle:"none",display:"flex",alignItems:"center",gap:"10px"}}><img
                style={{width:"50px",height:"50px",borderRadius:"100%",marginTop:"10px"}}
                src={item.Pictuer}/> {item.email}</li>)}

        </>


  );
};


export default Test;








import React, { useEffect, useState ,useRef} from 'react';
import './Souce__Camera.css';
import { useGlobalContext } from '../../Store/ContextProvider.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/joy/Button';
import {json} from "react-router-dom";
import axios from "axios";
import Desing from "../../Desing.jsx";

const Souce__Camera = () => {



    const { socket ,user,dispatch,currentuser } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const [matching, setMatching] = useState(false);
    const [legend, setLegend] = useState([]);
    const [help,sethelp] = useState(false)
    const [removeDesign,setRemoveDesign] = useState(false);
     const [test,setTest] = useState({});
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem("token");
        return storedToken ? JSON.parse(storedToken) : null;
    });







    /*


     @params @ auth

     */


    const auth  =async (email,password)=>{

        try{
            const {data} =  await axios.post("http://localhost:5000/auth",{

                "email":email,
                "password":password,

            })


            localStorage.setItem("token",JSON.stringify({token:data}))

            // dispatch({type:"add__user",payload:data})



            if(data){
                socket.emit("auth__get__user_from_frontned",{uniqueSocket:localStorage.getItem("SOCKET__ID__KEY"),Buffer : data})
            }
        }catch(eroor){
            console.log("this eroor was in ",eroor)

        }
    }

















    /*
     * @param Handle users online fr    om backend
     */
    useEffect(() => {
        const handleUsersOnlineFromBackend = (buffer) => {
            console.log(buffer,"this users before filtret");
            setTest(buffer)
            setLegend(buffer);
            const usersArray = Object.values(buffer);

            // Assuming token["token"]._id contains the current user's ID
            const filteredUsers = usersArray.filter(user => user._id !== token["token"]._id  && user.status==="Free");


            setLegend(filteredUsers);
        };

        socket.on('list__of__the__author__online__in_users__connected', handleUsersOnlineFromBackend);

        return () => {
            socket.off('list__of__the__author__online__in_users__connected', handleUsersOnlineFromBackend);
        };
    }, []);

    /*
     * @param Handle bringing a person
     *
     *
     *   /*
            *  to button if no user tell him soory no users right now should you waiting the users
            * and if he taken should be ask him to do request to remove his freind and then connect with it
            * the button called make icream
            */







    const HandelMakePeopleOff = (IdUserMatching,mysocketid)=>{
         console.log("square squaere")


        Object.entries(test).forEach(([key, value]) => {
            if (IdUserMatching._id == value._id) {

                socket.emit("HandelMakeUsersTakenInReactJs",{mysocketid:mysocketid,key:key})
            }
        });



    }









    const handleBringPerson = () => {
          console.log(' start ----------------------------------------------------');


        /*@ params   verify the user give him a token*/


        socket.emit("verify__user__token",{socketId : socket.id})





 if(Object.values(legend).length>0){

     console.log('my current data',token["token"]._id,token["token"].name,token["token"].email,'fucking unique socket',socket.id);

     let random =  Math.floor(Math.random() * Object.values(legend).length)



     console.log(random,Object.values(legend)[random],"*")



     setMatching(true)
     setRemoveDesign(false)

     // HandelStartGenrateTheOffe()
     // HandedlMakePeopleOn()
      HandelMakePeopleOff(Object.values(legend)[random],socket.id)
     setTimeout(()=>{
         setMatching(false)
     },1000)

 }else{
     console.log("no user right now sure?")

 }



        console.log('end --------------------------------------------------------');

    }







    useEffect(() => {

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            localStorage.setItem("refresh","true")
             event.returnValue = "Are you sure you want to leave?"; // This triggers the browser's default messagconsole.lo("hello world i love th is not wokring for m e i m gonna kilm my slef ")


        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);



    useEffect(()=>{

        if(localStorage.getItem("refresh")=="true"){

            setTimeout(()=>{
                console.log("***************" +
                    "*****" +
                    "**********************" +
                    "**************************" +
                    "***************" +
                    "*************" +
                    "**************************" +
                    "*********************" +
                    "********************************" +
                    "***********************" +
                    "***********************************" +
                    "*********************" +
                    "*********************",socket.id)

                localStorage.setItem("refresh","false")

                const email  =  token["token"].email
                const password = token["token"].password
                auth(email,password) /* @params this for authentication if you pass this by pointer this good*/
                console.log(email,password);
            },1000)
        }
    },[])





    const localStream = useRef(null);
    const [bgColor, setBgColor] = useState("black");
    const camera1 = useRef (null);
    const canvasRef = useRef(null);


useEffect(()=>{


    const init = async () => {
        try {
            // Get user media (local stream)
            localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          // console.log(localStream.current,"this fucking data","thi cmeera",camera1)

            // Attach the local stream to the local video element
            camera1.current.srcObject = localStream.current;
            // Attach the remote stream to the remote video element








        } catch (err) {
            console.error("Error accessing media devices:", err);
        }
    };


    init()    /*  this for intialie camera */



},[])





    useEffect(()=>{


        const extractColor = () => {
            const video = camera1.current;
            const canvas = canvasRef.current;

            if (!video || !canvas) return;


            const ctx = canvas.getContext("2d");



            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const frameData = ctx.getImageData( 0, 0, canvas.width, canvas.height).data;


            let r = 0,   g = 0,b = 0, count = 0;

            for (let i = 0; i < frameData.length; i += 200) {
                r += frameData[i]; // Red
                g += frameData[i + 1]; // Green
                b += frameData[i + 2]; // Blue
                count++;
            }

            setBgColor(`rgb(${Math.floor(r / count)}, ${Math.floor(g / count)}, ${Math.floor(b / count)})`);
        };

        const interval = setInterval(extractColor, 500); // Update every 0.5s

        return () => clearInterval(interval);


    },[])


    return (
        <div className="source__camera">

            <div className="my__camera" style={{ backgroundColor: bgColor}}>

                <video className="source_camera"
                       style={{borderRadius:"35px"}}
                       ref={camera1}  width="100%" height="100%" autoPlay />


                {removeDesign

                &&
                    <div className='title__people__connected'>
                        <Desing/>
                    </div>

                }

            </div>

            <div className="freind__camera">
                <video className="source_camera" width="100%" height="100%" autoPlay />
            </div>

            <div className="next">
                {loading ? (
                    <Button loading>Next</Button>
                ) : matching ? (
                    <Button disabled>Waiting</Button>
                ) : (
                    <Button onClick={handleBringPerson}>Next</Button>
                )}
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }} />

        </div>
    );
};

export default Souce__Camera;

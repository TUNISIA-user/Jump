import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from 'socket.io';
import http from "http"
import User  from "./userMode.js"
import HandelConnectMongoDbConnection from "./connect.js"
import HandelConnectionWithListeServer from "./serverConnection.js";
import EndPointTest   from "./testapi.js"




dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json())





HandelConnectMongoDbConnection() 
HandelConnectionWithListeServer(server,process.env.PORT)





app.use(cors({
    origin: ['http://localhost:5000','http://localhost:5173'],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));






const io = new Server(server,{
    cors:{
        origin: ["http://localhost:5000","http://localhost:5173"],

        
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }
});


























const Users__Connected = {}

io.on("connection", (socket) => {


     socket.on("HandelMakeUsersTakenInReactJs",(roket)=>{
         console.log(roket,"file does not wokring")
     })



    
        console.log("this users connected right now ==>",socket.id)

        socket.emit("SOCKET__ID",socket.id)

        socket.on("auth__get__user_from_frontned",(ts)=>{
            console.log(ts)
           Users__Connected[ts.uniqueSocket]  = ts.Buffer
         
           if(Users__Connected){
            io.emit("list__of__the__author__online__in_users__connected",Users__Connected)
           }
         
        })


        socket.on("hide__user__from__listes__users",(ts)=>{
            if(Users__Connected){
                Users__Connected[ts].status  = "Taken"
                io.emit("list__of__the__author__online__in_users__connected",Users__Connected)
            }

        })





       socket.on("verify__user__token",(uuid)=>{
           console.log("start proesuss ----------------------")

           if(Object.values(Users__Connected).length>1) {
               Users__Connected[uuid.socketId].status = "Free"
               console.log(uuid)

               io.emit("list__of__the__author__online__in_users__connected",Users__Connected)
           }


           console.log("end the process    ----------------------------")

       })









         socket.on('disconnect', () => {
            delete Users__Connected[socket.id]
            console.log('Client disconnected:', socket.id);

          
            io.emit("list__of__the__author__online__in_users__connected",Users__Connected)
          
        });

  });



  
app.post("/login",async(req,res)=>{
    
 
    try{
        const {ID,password,email,isOnline,status,Pictuer,name}  = req.body
  
        const checkUser = await User.findOne({ID,email,password})
        
        if(checkUser){
            res.status(409).json("this user alreday exsist")
            return ;
        }  
       
        let newUser = new User ({ID,password,email,isOnline,status,Pictuer,name})

        await newUser.save();
        if(newUser){
                 
            
                res.status(200).json(newUser)
        
        }else{
                res.status(404).json("You missing somehting")
            }
      
    }
    catch(HandelEroor){
        console.log("This Eroor Cauz => ",HandelEroor)
    }
    
})

app.post("/auth",async(req,res)=>{
    try{
        const {email,password} = req.body
        const FetchUser = await User.findOne({email})
      
     if(!FetchUser){
        res.status(409).json("Soory Not Found")
        return; 
    }
    res.status(200).json(FetchUser)

    }catch(erorr){
        console.log("This Eroor from",erorr)
    }
})








EndPointTest(app)


app.get("/clients",async(req,res)=>{
    try{
        const data = await  User.find({})
        res.status(200).json(data)

    }catch (eroor){
        console.log("This eroor cauz ",eroor)
    }
})




 




 
 



 
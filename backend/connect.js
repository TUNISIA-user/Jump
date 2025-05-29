import mongoose from "mongoose";

const HandelConnectMongoDbConnection  =async ()=>{
        try{
           await mongoose.connect(process.env.MONGO_URI)
           console.log("🚀 MongoDB Connected Successfully! 🎉");
        }
         catch(eroor){
            console.log(eroor)
         }
}


export default HandelConnectMongoDbConnection;  
import mongoose  from "mongoose";


const  User  =  mongoose.Schema ({

        ID: {type:String,required:true},
        name : {type:String,required:true},
        password : {type:String,required:true},
        email : {type:String,required:true},
        isOnline : {type:String,required:true},
        status : {type:String,default:"Free"},
        Pictuer : {type:String,default:"https://fastly.picsum.photos/id/965/200/300.jpg?hmac=16gh0rrQrvUF3RJa52nRdq8hylkBd-pL4Ff9kqsNRDQ"}


    },{timestamps: true}
)



export default  mongoose.model("users",User)


const EndPointTest = (app)=>{
    app.get("/",async(req,res)=>{
             // @ this for ensure the api wokring good  and   correctly
        res.status(200).json("this success people wokring")
    })
}

export default EndPointTest
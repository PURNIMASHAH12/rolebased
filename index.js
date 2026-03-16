import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./src/module/users/users.routes.js";


dotenv.config()
connectDB();
const PORT = process.env.PORT || 4000

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/user",userRoutes)
app.use('/',(req,res)=>{
    res.send("WELCOME TO BACKEND")
})
app.use(
    (err,req,res,next)=>{
    res.send("page not found")
})
 app.listen(PORT,() => {
      console.log(`Server is running on URL: http://localhost:${PORT}`);
    });
  
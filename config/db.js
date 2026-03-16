import mongoose from "mongoose";
import dotenv from "dotenv";

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB URL Connected successfully")
    }catch(err){
        console.log("MongoDB connection error",err);
        process.exit(1);
    }
    

}
export default connectDB;
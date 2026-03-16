import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:String,
    author:String,
    edition:String,
    genera:String,
    price:Number,
    takenBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    returnDate:{
        type:Date,
        require:true
    }
},  {timestamps:true})

const Book = new mongoose.model("Book", bookSchema)
export default Book;
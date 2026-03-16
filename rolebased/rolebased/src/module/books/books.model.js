import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    takenBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    returnDate:{
        type:Date,
        required:true
    }
}, {timestamps:true})

const bookModel = mongoose.model('Book', bookSchema)

export default bookModel
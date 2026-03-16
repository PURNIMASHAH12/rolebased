import mongoose from "mongoose";
const roleSchema=new mongoose.Schema({
    name:String,
     permission:[String],
}
);
const roleModel=mongoose.model('Role',roleSchema)
export default roleModel;
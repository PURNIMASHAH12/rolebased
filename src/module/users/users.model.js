import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'LGBTQ+'],
    default:"Female"
  },
  role: {
    type: String,
    enum: ['Admin', 'User',  'Librarian'],
    default:'User'
  },
}, { timestamps: true })

const userModel =mongoose.model("Users", userSchema)
export default userModel;

import userModel from "./users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// const userModel={}
// userModel.Register= async (req, res) => {

  export const createUser = async (req, res) => {
  try {
    const { name, email, password, gender, role } = req.body;
// const profile=req.file;
// console.log("Profile is",profile);
    if (!name || !email || !password || !gender || !role) {
      res.status(400).json({ 
        message: "All fields are required", 
        success: false });
    }

    const existingUser = await userModel.findOne({ email});
    if (existingUser){
          res.status(400).json({ 
        message: "User with this email already exists",
         success: false
         })
        }
         const salt=bcrypt.genSaltSync(10);
   //console.log(salt)
   const hashedPassword=bcrypt.hashSync(password,salt);
   //console.log(hashPassword)

    const newUser = await userModel.create({
      name,
      email,
      password:hashedPassword,
      gender,
      role,
    });

    await newUser.save()
    res.status(201).json({ 
        message: "User registered successfully",
    
  })
 } catch (error) {
    res.status(500).json({ 
        
    message: error.message || "SOMETHING WENT WRONG",
     success: false });
  }
}


// // LOGIN
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) return res.status(400).json({ message: "Email & password are required", success: false });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found", success: false });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials", success: false });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

//     res.status(200).json({ message: "Login successful", success: true, token });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false });
//   }
// };

// // GET ALL USERS
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({ message: "Users fetched successfully", success: true, data: users });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false });
//   }
// };

import express from "express";
import { createUser } from "./users.controller.js";
import userModel from "./users.model.js";

const router = express.Router();


router.post("/", user,getAllUsers);
router.post("/register",  createUser);
export default router;
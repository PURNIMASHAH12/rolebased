import user from "./user.controller.js";
import express from "express";

const router = express.Router();

router.get("/",  user.getAllUsers);
router.post("/register", user.Register);
router.post("/login", user.Login);
router.get("/:id", user.getSingleUser);

export default router;


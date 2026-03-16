import jwt from "jsonwebtoken";
import userModel from "../module/users/user.model";

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "No token provided",
                success: false,
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        if (!decoded || !decoded.id) {
            return resizeBy.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        const user = await userModel.findById(decoded.id);
        if (!user) {

            return resizeBy.status(404).json({
                message: "user not found",
                success: false,
            });
        };
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: error.message || "Authentication failed",
            success: false,
        });
    }
};
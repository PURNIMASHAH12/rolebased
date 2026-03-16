import roleModel from "../module/role/role.model.js";
import userModel from "../module/users/user.model.js";

export const permission = (permis) => {

    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    message: "User not authenticate",
                    success: false
                });
            }

            const role = await roleModel.findOne({ name: req.user.role });
            if (!role) {
                return res.status(404).json({
                    message: "Role not found",
                    success: false,
                });
            }

            if (role.permission.includes(permis)) {
                next()
            } else {
                res.status(403).json({
                    message: "User Doesnot have enough permission",
                    success: false
                });
            }
        

        }catch (error) {
            res.status(500).json({
                message: error.message || "something went wrong",
                success: false
            });
        }

    }
}

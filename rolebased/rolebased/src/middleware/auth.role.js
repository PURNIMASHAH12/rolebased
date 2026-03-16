
export const authRole = (role) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    message: "User not authenticated",
                    success: false,
                });
            }

            if (req.user.role === role) {
                next();
            } else {
                res.status(403).json({
                    message: "Unauthorized User...",
                    success: false,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || "Something went Wrong",
                success: false,
            });
        }
    };
};


import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, data) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthenticated"
            });
        }
        req.user = await User.findById(data.userId);
        next();
    });
};

export { authMiddleware }
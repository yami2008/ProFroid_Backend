import User from "../models/User.js";
import jwt from "jsonwebtoken" ;

const login = async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    });
    if(!user) {
        return res.status(401).json({



            username: "Wrong email or password"
        });
    }
    const token = jwt.sign({userId: user._id,}, process.env.TOKEN_SECRET);
    return res.json({
        token
    });
};

export { login }
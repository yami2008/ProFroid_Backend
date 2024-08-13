import User from "../models/User.js";
import jwt from "jsonwebtoken" ;
import joi from "joi";

const login = async (req, res) => {
    const schema = joi.object({
        username : joi.string().trim().min(5).max(50).required(),
        password : joi.string().trim().min(5).max(50).required(),
    });
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    });
    if(!user) {
        return res.status(422).json({
            message: "Wrong email or password"
        });
    }
    const token = jwt.sign({userId: user._id,}, process.env.TOKEN_SECRET);
    return res.json({
        token
    });
};

export { login }
import joi from "joi";

const authValidation = joi.object({
    username : joi.string().trim().min(5).max(50).required(),
    password : joi.string().trim().min(5).max(50).required(),
});

export default authValidation ;
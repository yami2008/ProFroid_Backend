import mongoose from "mongoose";
const objectIdMiddleware = (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        next();
    }
    else {
        res.status(400).json({
            message: "Invalid Object ID"
        });
    }
}
export default objectIdMiddleware ;
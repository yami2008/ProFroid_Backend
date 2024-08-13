import User from "../models/User.js";

const index = async (req, res) => {
    const users = await User.find();
    return res.status(200).json({
        data : users ,
    });
}

const store = async (req, res) => {
    const user = await User.create({
        username : req.body.username,
        password : req.body.password,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        role : "Admin",
        phone_number : req.body.phone_number,
        address : req.body.address,
        picture : "" ,
        status : 1,
    });
    return res.status(200).json({
        data : user,
        message : "Profil ajouté avec succes" ,
    });
}

const show = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user){
        return res.status(404).json({
            message : "User Not Found" ,
        });
    }
    return res.status(200).json({
        data : user,
    });
}

const update = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user){
        return res.status(404).json({
            message : "User Not Found" ,
        });
    }
    user.username = req.body.username ;
    user.password = req.body.password ;
    user.first_name = req.body.first_name ;
    user.last_name = req.body.last_name ;
    user.role = req.body.role ;
    user.phone_number = req.body.phone_number ;
    user.address = req.body.address ;
    user.status = req.body.status ;
    user.save();
    return res.status(200).json({
        data : user,
    });
}

const destroy = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user){
        return res.status(404).json({
            message : "User Not Found" ,
        });
    }
    return res.status(200).json({
        message: "Deleted successfully"
    });
};

export {index, store, show, update, destroy}
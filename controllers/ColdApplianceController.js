import ColdAppliance from "../models/ColdAppliance.js";

//////////////////////////////////////////

const index = async (req, res) => {
    const coldAppiances = await ColdAppliance.find() ;
    return res.status(200).json({
        data : coldAppiances
    });
}

//////////////////////////////////////////

const store = async (req, res) => {
    const coldAppliance = await ColdAppliance.create({
        name : req.body.name ,
        brand : req.body.brand ,
        // model : req.body.model ,
        serial_number : req.body.serial_number ,
        type : req.body.type ,
        // capacity : req.body.capacity ,
        // power : req.body.power ,
        // height : req.body.height ,
        // width : req.body.width ,
        // depth : req.body.depth ,
        price : req.body.price ,
        // stock_quantity : req.body.stock_quantity ,
        // features : req.body.features ,
        // images : req.files?.map(file => file.path),
    });
    return res.status(200).json({
        data : coldAppliance,
        message : "Produit ajouté avec success" ,
    });
}

//////////////////////////////////////////

const show = async (req, res) => {
    const coldAppliance = await ColdAppliance.findById(req.params.id);
    if (!coldAppliance){
        return res.status(404).json({
            message : "Entity Not Found" ,
        });
    }
    return res.status(200).json({
        data : coldAppliance,
    });
}

//////////////////////////////////////////

const update = async (req, res) => {
    const coldAppliance = await ColdAppliance.findById(req.params.id);
    if (!coldAppliance){
        return res.status(404).json({
            message : "Entity Not Found" ,
        });
    }
    coldAppliance.name = req.body.name;
    coldAppliance.brand = req.body.brand;
    coldAppliance.model = req.body.model;
    coldAppliance.serial_number = req.body.serial_number;
    coldAppliance.type = req.body.type;
    coldAppliance.capcity = req.body.capcity;
    coldAppliance.power = req.body.power;
    coldAppliance.height = req.body.height;
    coldAppliance.width = req.body.width;
    coldAppliance.depth = req.body.depth;
    coldAppliance.price = req.body.price;
    coldAppliance.stock_quantity = req.body.stock_quantity;
    coldAppliance.manuel = req.body.manuel;
    coldAppliance.features = req.body.features;
    coldAppliance.save();
    return res.status(200).json({
        data : coldAppliance,
    });
}

//////////////////////////////////////////

const destroy = async (req, res) => {
    const coldAppliance = await ColdAppliance.findByIdAndDelete(req.params.id);
    if (!coldAppliance){
        return res.status(404).json({
            message : "Entity Not Found" ,
        });
    }
    return res.status(200).json({
        message: "Deleted successfully"
    });
};

//////////////////////////////////////////

const addImage = async (req, res) => {
    const imagePaths = req.files.map(file => file.path);
    const coldAppliance = await ColdAppliance.findByIdAndUpdate(
        req.params.id,
        {
            $push: {
                images: { $each: imagePaths }
            }
        },
        {new: true}
    );
    if (!coldAppliance) {
        return res.status(404).json({
            message: 'Cold appliance not found'
        });
    }
    res.status(200).json({
        data : coldAppliance
    });
}

//////////////////////////////////////////

const removeImage = async (req, res) => {
    const coldApplianceId = req.params.id;
    const imagePath = req.body.imagePath;
    const coldAppliance = await ColdAppliance.findById(coldApplianceId);
    if (!coldAppliance) {
        return res.status(404).json({
            message: 'Cold appliance not found'
        });
    }
    const imageIndex = coldAppliance.images.indexOf(imagePath);
    if (imageIndex === -1) {
        return res.status(404).json({
            error: 'Image not found in the appliance'
        });
    }
    coldAppliance.images.splice(imageIndex, 1);
    await coldAppliance.save();
    res.status(200).json({
        message: 'Image removed successfully'
    });
}

//////////////////////////////////////////

export {index, store, show, update, destroy, addImage, removeImage}
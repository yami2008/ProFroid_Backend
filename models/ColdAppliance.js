import mongoose from "mongoose";

const ColdApplianceSchema = new mongoose.Schema({
    name : String ,
    brand : String ,
    model : String ,
    serial_number : String ,
    type : String ,
    capacity : String ,
    power : String ,
    height : Number ,
    width : Number ,
    depth : Number ,
    price : Number ,
    stock_quantity : Number ,
    manuel : String ,
    images : [String] ,
    features : String ,
},{
    collection : 'cold_appliances' ,
    timestamps : true ,
});

const ColdAppliance = mongoose.model('ColdAppliance', ColdApplianceSchema);
export default ColdAppliance ;
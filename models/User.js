import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : String ,
    password : String ,
    first_name : String ,
    last_name : String ,
    role : String ,
    phone_number : String ,
    address : String ,
    picture : String ,
    status : Number ,
},{
    collection : 'users',
    timestamps : true ,
});

const User = mongoose.model('User', UserSchema);
export default User ;
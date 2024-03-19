import mongoose from "mongoose";

const userprofileSchema=new mongoose.Schema({
    id:Number,
    name:String
})
const userschema = mongoose.model('UserProfile', userprofileSchema);

export{userschema}
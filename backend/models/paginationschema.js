import mongoose from "mongoose";

const paginationSchema = new mongoose.Schema({
    userId: Number,
    it:Number,
    title:String,
    body:String
});

const paginationschema = mongoose.model('paginations', paginationSchema);

export{paginationschema}
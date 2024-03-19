import mongoose from "mongoose";
const usertype= new mongoose.Schema({
    id:Number,
    type:String
})
const domain= new mongoose.Schema({
    id:Number,
    name:String
})

const funding=new mongoose.Schema({
    id:Number,
    name:String
})

const fundingsource=new mongoose.Schema({
    id:Number,
    name:String
})
const companyname=new mongoose.Schema({
    id:Number,
    name:String
})
const compname=new mongoose.Schema({
    name:String
})

const userSchema=new mongoose.Schema({
    id:Number,
    username:String,   
    emailid:String,
    password:String,
    founded:Date,
    userType:usertype,
    profileImage:String,
    profileAlt:String,
    //entre type
    ventureName:String,
    ventureDomain:domain,
    ventureStatus:funding,
    fundingstatus:fundingsource,
    NumberOfEmployees:Number,
    investorName:String,
    //tech type
    companyName:companyname,
    designation:String,
    yearsOfExp:Number,
    AreaofExp:String,
    //investor type
    MajorInvestingDomain:companyname,
    BackedComp:[String],
    AvailableFunding:Number,
    rooms: [{
        id: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'Room'
        },
        lastRead : {
            type: Number,
            required: true,
            default: -1
        }
    }],
    //latest message stamp
    // lastMessage: Date,
    
    
},{timestamps:true,
    versionKey: false });
const userschema = mongoose.model('User', userSchema);

export{userschema}
import { userschema } from "../models/userschema.js";

 async function signinuser(req,res){
    
    const response=await userschema.find({emailid:req.emailid,password:req.password})
    if(response){
        console.log(response);
       res.send(response[0]);
    }
    
}
export{signinuser};
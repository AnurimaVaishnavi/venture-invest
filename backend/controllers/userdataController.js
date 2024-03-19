import { userschema } from "../models/userschema.js";
async function saveuserdata(req,res){
 const userdata=new userschema(req);
 userdata.save().then(function(response){
    if(response){
        
        res.send({
            "message":"success",
            "code":"200",
            "status":"OK"
        })
    }else{
        res.send({
            "message":"something went wrong",
            "code":"201",
            "status":"ERROR"
        })
    }
    
 })
    
}
export{saveuserdata};
import { userschema } from "../models/userprofileschema.js";
function getdata(res){
 const userdatadata=new userschema({id:3,name:"Aravind"});
 userdatadata.save().then(function(res){
    if(res){
        console.log("successfully inserted");
    }
 })
    
}
export{getdata};
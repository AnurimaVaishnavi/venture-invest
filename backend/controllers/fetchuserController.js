
import { userschema } from "../models/userschema.js";
async function fetchuser(req,res){
try {
    // const users = await userschema.find({ _id: { $ne: req.params.id } }).select([
      const users = await userschema.find({}).select([
      "emailid",
      "username",
      "profileImage",
      "_id",
    ]).sort({ lastMessage: -1 });;
    return res.json(users);
  } catch (error) {
  }
}
export{fetchuser};
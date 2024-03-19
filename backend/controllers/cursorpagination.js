import { Room } from "../models/roomschema.js";
import { userschema } from "../models/userschema.js";
import { msgschema } from "../models/messageschema.js";
import {Post} from "../models/postsschema.js";

export default async function cursorpagination (model,req){
    let batch_size=10;
    let cursor=req.cursor_val;
    if (cursor==null){
        cursor=0;
    }
    const response=await Post.find().limit(batch_size);

}
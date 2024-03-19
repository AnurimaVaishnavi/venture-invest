import { paginationschema } from "../models/paginationschema.js";
import {Post} from "../models/postsschema.js";
import {userschema} from "../models/userschema.js";
 async function fetchfeed(req,res){
    // let cursor=req.cursor_val;
    // let query={}
    // if (cursor==null){
    //     cursor=0;
    //     query.it={ $gt: cursor,
    //                 $lte:cursor+req.limit
    //             }
    // }else{
    //     query.it={ $gt: cursor,
    //                $lte:cursor+req.limit
    //              }
    // }
    // const response=await paginationschema.find(query).sort({it:1}).limit(parseInt(req.limit, 10)).exec();
    // const nextCursor = response.length > 0 ? response[response.length - 1].it : null;
    // console.log(nextCursor);
    // if(response){
    //    res.send({
    //     data:response,
    //     nextCursor:nextCursor
    //    });
    // }

    let batch_size=10;
    let cursor=req.cursor_val;
    if (cursor==null){
        cursor=0;
    }
    const response=await Post.find().skip(cursor).limit(batch_size);
    const nextCursor = response.length > 0 ?(cursor+batch_size):null;

    const userDetailsPromises = response.map(async (post) => {
        const user_details = await userschema.findOne({ _id: post.author_id });
        return {
            ...post.toObject(),
            avatar: user_details ? user_details.profileImage : "",
            name: user_details ? user_details.username : "",
        };
    });

    const enrichedPosts = await Promise.all(userDetailsPromises);

    res.send({
        data: enrichedPosts,
        nextCursor: nextCursor,
    });
    
    // if(response && response.length>0){
    //    res.send({
    //     data:response,
    //     nextCursor:nextCursor
    //    });
    // }
    
}
export{fetchfeed};
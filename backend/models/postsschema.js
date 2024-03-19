import mongoose from 'mongoose';
import {Comment} from './commentsschema.js';
import {Like} from './likesschema.js';
import {userschema} from './userschema.js';
const postSchema = new mongoose.Schema(
    {
        author_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userschema',
            required: true,
          },
        postDescription: {
            type: String,
            required: true
        },
        ScheduleStatus:{
            type:Number
        },
        ScheduleDateTime:{
           type: Date
        },
        media:[{
         filename:String,
         mediatype:Number,
        }],
        comments : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Comment
        }],
        likes : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Like
        }]
    } , { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export {Post}





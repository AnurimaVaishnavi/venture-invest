import mongoose from 'mongoose';
import {Comment} from './commentsschema.js';
import {Like} from './likesschema.js';
const scheduleschema = new mongoose.Schema(
    {
        author : {
            id: mongoose.Schema.Types.ObjectId,
            name: String,
            avatar :  String,
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
        media:{
         filename:String,
         mediatype:Number,
        },
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

const schjob = mongoose.model("scheduledjob", scheduleschema);
export {schjob}





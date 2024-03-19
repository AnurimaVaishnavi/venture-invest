import mongoose from 'mongoose';
import {Like} from './likesschema.js';

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'postsschema',
        required: true,
    },
    level: {
        type: Number,
        default: 0
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userschema',
        required: true,
      },
    body: {
        type: String,
        required: true
    },
    likes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
    repliesCount : {
        type: Number,
        default: 0
    },
    childComments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    state: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'active'
    },

}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);

export { Comment };
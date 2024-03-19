import mongoose from 'mongoose';
const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likedItem: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        enum: ['Post', 'Comment','Message']
    }
    }, { timestamps: true}
);
const Like = mongoose.model('Like', likeSchema);
export {Like};

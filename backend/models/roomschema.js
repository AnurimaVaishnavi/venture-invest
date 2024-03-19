import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    }],
    group_key: {
        type: String,
        required: true
    },
},{ timestamps: true,
 });
const Room = mongoose.model('Room', roomSchema);
export{Room}



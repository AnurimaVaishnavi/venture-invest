import mongoose from "mongoose";
const messageschema = new mongoose.Schema({
  message: {
    text: { 
      type: String, 
      required: true 
    },
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  group_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  media:[String],
},
{
  timestamps: true,
});
const msgschema = mongoose.model('Message', messageschema);
export{msgschema}
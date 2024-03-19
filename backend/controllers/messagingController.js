import mongoose from "mongoose";
import { msgschema } from "../models/messageschema.js";
import { userschema } from "../models/userschema.js";
import {Room} from "../models/roomschema.js"
import onlineUsersFunc from './onlineUsersController.js'
function initializeSocket(io) {
  io.on('connection', (socket) => {
    socket.on('add-user',(userId) => {
      if(userId){
        onlineUsersFunc.setUserData(userId, socket.id);
        socket.emit("online-users", onlineUsersFunc.onlineUserIds);
      }
    });
    socket.on('send-msg',async(data)=>{
      const room_id = new mongoose.Types.ObjectId(data.roomId);
      const room = await Room.findById(room_id);
      const message = await msgschema.findById(data.messageId);
      const group_key = room.group_key;
      const profileImage = (await userschema.findById(message.sender))?.profileImage;
      const obj ={
        ...message.toObject(),
        group_key: group_key,
        profileImage: profileImage
      };
      room.users.forEach((userId) => {
        const socket_id = onlineUsersFunc.getUserData(userId.toString());
        if (socket_id && onlineUsersFunc.getCurrentChatWindow(userId.toString()) == data.roomId) {
          console.log(socket_id,"socket_id");
          io.to(socket_id).emit("message-notification", obj);
          // io.to(socket_id).emit("conversations-updated", obj);
        }
      });
    })
    socket.on("logout", (userId) => {
      onlineUserIds[userId]=false;
  
      io.emit("online-users", onlineUserIds);
    })
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

async function sendMessage(req,res){
  try {
    const { roomId, userId, message} = req;
    const data = await msgschema.create({
      message: { text: message },
      sender: userId,
      group_id: roomId,
    });
    await Room.findOneAndUpdate(
      { _id: roomId },
      { $push: { messages: data._id } },
      { new: true }
    );
    return res.json({ id: data._id });
  } catch (error) {
  }
}


export{ initializeSocket,sendMessage};

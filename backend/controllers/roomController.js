import { Room } from "../models/roomschema.js";
import mongoose from "mongoose";
import { msgschema } from "../models/messageschema.js";
import onlineUsersFunc from '../controllers/onlineUsersController.js';
import { userschema } from "../models/userschema.js";
import { read } from "fs";
function initSocket(io) {
    io.on('connection', (socket) => {
    socket.on("group-created", async (data) => {
        data.users.map((userId) => {
            const socket_id = onlineUsersFunc.getUserData(userId.toString());
            if (socket_id){
                console.log(typeof socket_id,"donkey arjun");
                io.to(socket_id).emit("conversations-updated");
            }
        })
    })
    socket.on("read-all-room-messages",async (data)=>{
        const room = await Room.findById(data.roomId);
        const user = await userschema.findById(data.userId);
        user.rooms.find(group => String(group.id) === String(room._id)).lastRead = room.messages.length-1;
        await user.save();

    });
    socket.on("typing",async (data)=>{
        const room = await Room.findById(data.roomId);
        room.users.forEach((userId) => {
            const socket_id = onlineUsersFunc.getUserData(userId.toString());
            if (socket_id && onlineUsersFunc.getCurrentChatWindow(userId.toString()) == data.roomId) {
              io.to(socket_id).emit("message-typing");
            }
          });
    })

    socket.on('fetch-conversations', async (data)=> {
        console.log("anurima",data);
        const socket_id = onlineUsersFunc.getUserData(data.userId.toString());
        if (socket_id) {
            console.log(socket_id,"namita thapar");
            io.to(socket_id).emit("conversations-updated");
            }
    });

})};

const updateRoom = async (req, res)=>{
}
const newRoom = async (req, res) => {
    const users = req.users.map(userId => new mongoose.Types.ObjectId(userId));
    const room = new Room ({...req, users: users});
    room.save().then(room => {
        users.map((userId) => {
            userschema.findById(userId).then((user) => {
                user.rooms.push({id : room._id});
                return user.save(); 
            }
            );
        });
        res.status(200).json("room successfully added");
    });
}
//TODO: add cursor pagination to this
const fetchRoomMessages = async(req,res) => {
    var lastRead;
    const user_id = new mongoose.Types.ObjectId(req.body.userId);
    const room_id = new mongoose.Types.ObjectId(req.body.roomId);
    onlineUsersFunc.setCurrentChatWindow(user_id.toString(),room_id.toString()); 
    const room = await Room.findById(room_id);
    const user = await userschema.findById(user_id);
    console.log(user.rooms,"rooms");
    console.log(room,"room");
    user.rooms.forEach(curr => {
       if (curr.id.toString() === room._id.toString()){
            lastRead = curr.lastRead;
       }
    });
    let batch_size = 10
    let up= req.query.up;
    if (up==null){
        up=lastRead;
    }
    let down = req.query.down;
    if (down==null){
        down=lastRead;
    }
    // const messagesUpToLastIndex = room.messages.slice(up-batch_size,lastRead+1);
    const messagesUpToLastIndex = room.messages.slice(0,lastRead+1)
    let read_messages = await Promise.all(room.messages.map(async (messageId) =>{
        if (messagesUpToLastIndex.indexOf(messageId)>=0){
            const message = await msgschema.findById(messageId);
            if (message) {
                const sender = await userschema.findById(message.sender);
                if (sender) {
                   const obj= { 
                    ...message.toObject(),
                    profileImage: sender.profileImage,
                }
                return obj;
                }
            }
        } 
    }));
    read_messages=read_messages.filter(item=>item!=null);
    lastRead = lastRead+1;
    // const unreadIndex = room.messages.slice(lastRead+1, down+batch_size);
    const unreadIndex = room.messages.slice(lastRead+1);
    let unread_messages = await Promise.all(room.messages.map(async (messageId) =>{
        if (unreadIndex.indexOf(messageId)>=0){
            const message = await msgschema.findById(messageId);
            if (message) {
                const sender = await userschema.findById(message.sender);
                if (sender) {
                   const obj= { ...message.toObject(),
                    profileImage: sender.profileImage,
                }
                return obj;
                }
            }
        }
    }));
    unread_messages=unread_messages.filter(item=>item!=null);
    const obj ={
        ...room.toObject(),
        readMessages: read_messages,
        unread_messages: unread_messages,
        up: up-batch_size,
        down: down+batch_size,
    };
    await user.save();
    res.status(200).json(obj);
};
//TODO: add cursor pagination to this
const fetchConversations = async (req, res) => {
    try {
        let batch_size=10;
        let cursor= req.query.cursorVal;
        if (cursor==null){
            cursor=0;
        }
        console.log(cursor,"baby check the cursor value");
        const user = await userschema.findById(req.params.id);
        const total_rooms = user.rooms.length;
        const rooms_obj = user.rooms.slice(parseInt(cursor), parseInt(cursor) + batch_size);
        const rooms = await Promise.all(rooms_obj.map(async (room_obj) => {
            const room = await Room.findById(room_obj.id);
            return { ...room.toObject(), lastRead: room_obj.lastRead };
        }));
        rooms.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        console.log(rooms,"rooms");
        const sortedRooms = await Promise.all(rooms.map(async (room) => {
            const users = room.users;
            const profileImagesPromises = users.map(userId => {
                return userschema.findById(userId).then(user => user.profileImage);
            });
            const profileImages = await Promise.all(profileImagesPromises);
            const msg = await msgschema.findById(room.messages[room.lastRead+1]);
            return {
                group_key: room.group_key,
                room_id: room._id,
                profileImages: profileImages,
                lastReadMessage: msg && msg.message ? msg.message.text : "",
            };
        }));
        console.log(parseInt(cursor) + batch_size,"cursorVal");
        res.status(200).json({sortedRooms,cursorVal: parseInt(cursor) + batch_size,
        maxcursorVal: total_rooms});
    }catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export {newRoom,updateRoom,fetchConversations,initSocket,fetchRoomMessages};


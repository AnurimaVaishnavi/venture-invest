import { redisclient } from './redisController.js';
import onlineUsersFunc from './onlineUsersController.js';

function init_socket(io) {
    io.on('connection', (socket) => {
        socket.on('join-room', async (data) => {
            console.log(data, "def");
            const roomId = data.roomId;
            const userId = data.userId;
            // const room = io.sockets.adapter.rooms.get(roomId);
            socket.join(roomId);
            socket.broadcast.to(roomId).emit("start_call", { data });
        });
        socket.on("create-room", async (data) => {
            console.log(data, "abc");
            const roomId = data.roomId;
            const userId = data.userId;
            socket.join(roomId);
            socket.broadcast.to(roomId).emit("start_call", { data });
        });
        socket.on("toggle-audio-video", ({ }) => {

        });
        socket.on('webrtc_ice_candidate', (event) => {
            console.log(`Broadcasting webrtc_ice_candidate event to peers in room ${event.roomId}`);
            socket.to(event.roomId).emit('webrtc_ice_candidate', event);
        });

        socket.on('webrtc_offer', (event) => {
            console.log(`Broadcasting webrtc_offer event to peers in room ${event.roomId}`)
            socket.to(event.roomId).emit('webrtc_offer', event.sdp)
        })
        
        socket.on('webrtc_answer', (event) => {
            console.log(`Broadcasting webrtc_answer event to peers in room ${event.roomId}`)
            socket.to(event.roomId).emit('webrtc_answer', event.sdp)
        })
        

        socket.on("leave-room", (roomId) => {
            socket.leave(roomId);
        });
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
}

export { init_socket };

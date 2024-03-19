import http from 'http';
import {connectToDatabase,mongoose} from './database_connect.js'
import express from 'express';
import { Server } from "socket.io";
import {initializeSocket} from './controllers/messagingController.js'
import {initSocket} from './controllers/roomController.js'
import {init_socket} from './controllers/videoController.js'
import {commentSocket} from './controllers/commentsController.js'
import { scheduledjob } from './controllers/cronjobController.js';
import { router } from './routes/vcroutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { redisclient } from './controllers/redisController.js';

// const mongoose = require('mongoose');

// Create an HTTP server
const app=express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
app.use(express.json())
app.use(express.static('public'));
const server = http.createServer(app,(req, res) => {
    res.write('<h1>Hello, Node.js HTTP Server!</h1>');
    res.end();
});
// Specify the port to listen on
const port = 3001;
// Start the server
server.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`);
});


await redisclient.set('test', 'redis value fetched');
const value = await redisclient.get('test');
redisclient.set("feed_control",0);
console.log(value);




async function initializeConnection() {
    try {
       await connectToDatabase();
      const io = new Server(server, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
        });
      initializeSocket(io);
      initSocket(io);
      init_socket(io);
    } 
    finally {
       //await dbConnection.close();
    }
  }
    // Call the function
  await initializeConnection().catch(console.error);
  scheduledjob.start();
  app.use("/venture-connect",router)
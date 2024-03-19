import express from 'express'
import { saveuserdata } from '../controllers/userdataController.js';
import { signinuser } from '../controllers/loginuserController.js';
import { createpost } from '../controllers/createpostController.js';
import { fetchfeed } from '../controllers/feedController.js';
import { initializeSocket } from '../controllers/messagingController.js';
import {addComment} from '../controllers/commentsController.js';
import {getComments} from '../controllers/commentsController.js';
import { updateComment } from '../controllers/commentsController.js';
import {fetchuser} from '../controllers/fetchuserController.js';
import {sendMessage} from '../controllers/messagingController.js';
import multer from 'multer';
import {fetchConversations, newRoom,fetchRoomMessages} from '../controllers/roomController.js'
import path,{dirname} from 'path';
const router=express.Router();



router.get("/test", (req, res) => {
    getdata(res);
  });

//image/file handling in express/node/mongodb
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix+'-'+file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post("/upload",upload.array('file',50), (req, res) => {
  console.log(req);
  res.send(req.files);
});
router.post("/signup", (req, res) => {
  console.log(req.body);
  saveuserdata(req.body,res);
});

router.post("/signin", (req, res) => {
  console.log(req.body);
  signinuser(req.body,res);
});

router.post("/createpost", (req, res) => {
  console.log(req.body);
  createpost(req.body,res);
});

router.post("/fetchfeed", (req, res) => {
  fetchfeed(req.body,res);
});

router.post("/comments-add", (req,res)=> {
  addComment(req.body,res);
});

router.get("/comments-get",(req,res)=> {
  getComments(req.query,res);
});

router.post("/comments-edit",(req,res)=> {
  updateComment(req.body,res);
});

router.post("/sendMessage", (req, res) => {
  sendMessage(req.body,res);
});
router.post("/recieveMessage", (req, res) => {
  recieveMessage(req.body,res);
});

router.get("/getUsers", (req, res) => {
  fetchuser(req,res);
});

router.post("/createRoom",(req,res)=> {
  newRoom(req.body,res);
});
router.get("/fetch-conversations/:id", (req,res)=>{
  fetchConversations(req,res)
});

router.post("/fetch-messages",(req,res)=>{
  fetchRoomMessages(req,res)
});



export{router}
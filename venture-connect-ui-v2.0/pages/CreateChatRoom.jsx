import {useState,useEffect} from 'react';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Layout from '../src/components/Layout';
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import toastOptions from "../src/utils/toastOptions";
import UserProfile from './session';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CopyAllOutlinedIcon from '@mui/icons-material/CopyAllOutlined';
import DuoOutlinedIcon from '@mui/icons-material/DuoOutlined';
import Alert from '@mui/material/Alert';
import {useUserStore} from '../src/utils/store.ts'
export default function VideChat() {
  const history=useRouter();
  const[room,setRoom]=useState();
  const[link,setLink]=useState();
  const[roomlink,setRoomLink]=useState();
  const[createRoomLink,setcreateRoomLink]=useState();
  const[start,setStart]=useState(false);
  const [error, setError] = useState(null);
  let isRoomCreator = false;
  let value;
  const socket = useUserStore(state => state.socket);
  const currentUser = useUserStore(state => state.currentUser);
  const setCurrentUser = useUserStore(state => state.setCurrentUser);
  function generateRandomString(){
    const crypto = window.crypto || window.msCrypto;
    let array = new Uint32Array(1);
    return crypto.getRandomValues(array);
  }
  function handleroom(e){
        setRoom(e.target.value);
  }
  function handlelink(e){
    setLink(e.target.value);
  }

  function generateinvite(e){
    if(room){
    value = generateRandomString();
    setcreateRoomLink(`${location.origin}/videocall/${value}`);
    setStart(true);
  }
  }
  const createChatRoom = () =>{
    if (createRoomLink){
      const parts = createRoomLink.split("/");
      const value = parts[parts.length - 1];
      socket.emit('create-room',{userId:currentUser._id, roomId: value})
    }
    isRoomCreator = true;
    router.push({
      pathname: createRoomLink,
      query: { isRoomCreator: isRoomCreator,
      roomId: value}
    });
  }

  const joinChatRoom = () =>{
    if (link){
      const parts = link.split("/");
      const value = parts[parts.length - 1];
      socket.emit('join-room',{userId:currentUser._id,roomId: value})
      router.push({
        pathname: link,
        query: { isRoomCreator: isRoomCreator,
        roomId: value}
      });
    }
  }
  useEffect (()=>{
    setCurrentUser(JSON.parse(localStorage.getItem("userdata")))
  },[])

  const router = useRouter()
  return (
    <Layout>
      <div>
        <Stack className="col-md-5 mx-auto">
          <Form>
            <h2 className="text-center"><b>Create Room</b></h2>
            <Form.Group className="mb-3" controlId="formBasicRoomName">
              <Form.Label>Room Name</Form.Label>
              <Form.Control type="text" placeholder="Enter room name" onChange={handleroom} autoComplete="off"/>
              </Form.Group>
              <Stack gap={2} className="col-md-15 mx-auto">      
              <Button className="mb-3" variant="outline-dark" onClick={generateinvite} style={{width:"100%"}} disabled={!room||room==""||room==undefined}>
              <ShareOutlinedIcon /> Generate Invite
              </Button>
            { start && <Button className="mb-3" variant="outline-dark" onClick={createChatRoom} style={{width:"100%"}}>
              <DuoOutlinedIcon />Start Call
              </Button>}
              { start && <Alert severity="info" action={
            <CopyAllOutlinedIcon color="inherit" onClick={() =>  navigator.clipboard.writeText(createRoomLink)} />
          }>{createRoomLink}</Alert>}
                </Stack>
          </Form>
          <Form>
      
<h2 className="text-center"><b>Join Room</b></h2>
      <Form.Group className="mb-3" controlId="formBasicRoomName">
        <Form.Label>Room Name</Form.Label>
        <Form.Control type="text" placeholder="Enter room link" onChange={handlelink} autoComplete="off"/>
      </Form.Group>
      <Stack gap={2} className="col-md-15 mx-auto">      
     { start && <Button className="mb-3" variant="outline-dark" onClick={joinChatRoom} style={{width:"100%"}}>
      <DuoOutlinedIcon />Join Call
      </Button>}
      { start && <Alert severity="info" action={
    <CopyAllOutlinedIcon color="inherit" onClick={() =>  navigator.clipboard.writeText(link)} />
  }>{link}</Alert>}
        </Stack>
    </Form>
    <ToastContainer />
    </Stack>
  </div>
  
    </Layout>
  );
}




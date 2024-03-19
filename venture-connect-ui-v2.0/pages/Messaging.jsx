import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useRouter } from "next/router";
import API_ENDPOINTS from '../src/utils/api';
import axios from 'axios';
import styled from "styled-components";
import Layout from '../src/components/Layout';
import Connections from '../src/components/Messaging/Chat/Connections';
import ChatContainer from '../src/components/Messaging/Chat/ChatContainer';
import Welcome from '../src/components/Messaging/Chat/Welcome';
import {useMessagingStore} from '../src/components/Messaging/Chat/MessagingStore';
import {useUserStore} from '../src/utils/store'
const socket = io('http://localhost:3001');
export default function Messaging() {
  const history=useRouter();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [recv, setRecv] = useState('');
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [chatBanner, setChatBanner] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [contactrefresh, setContactRefresh] = useState(false);
  const [onlineUserIds, setOnlineUserIds] = useState({});
  const [connectiondata,setConnectionData]=useState([]);
  const conversations = useMessagingStore(state => state.conversations);
  const setConversations = useMessagingStore(state => state.setConversations);
  const allUsers = useUserStore(state => state.allUsers);
  const setAllUsers = useUserStore(state => state.setAllUsers);
  const setCursorVal = useMessagingStore(state => state.setCursorVal);
  const cursorVal = useMessagingStore(state => state.cursorVal);
  const scroll = useMessagingStore(state => state.scroll);
  const setScroll = useMessagingStore(state => state.setScroll);
  const maxScroll = useMessagingStore(state => state.maxScroll);
  const setMaxScroll = useMessagingStore(state => state.setMaxScroll);
  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("userdata")) {
        history.push('/SignIn');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("userdata")));
        setIsLoaded(true);

      }
    };
    fetchData();
  }, []);

  useEffect(()=>{
    axios.get(API_ENDPOINTS.FETCHUSERS).then((response)=>{
      setAllUsers(response.data);
    })
},[])

  useEffect(() => {
    if (currentUser) {
    socket.emit('add-user',currentUser._id);
    socket.on("online-users", (userId) => {
      setOnlineUserIds(userId);
      console.log(onlineUserIds);
    })
    socket.on('chat message', (msg,socketId) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      console.log(socketId);
    });
    socket.on('chat history', (history) => {
      setMessages(history);
    });
    return () => {
      socket.off('chat message');
      socket.off('chat history');
    };
   }
  }, [currentUser]);

  socket.on('conversations-updated', async (data) => {
    console.log("group created/ new message sent to existing group");
    fetchConversations(1);
  });

  useEffect(() => {
    if (scroll){
    fetchConversations()
  };
  }, [currentUser,scroll]);

  const fetchConversations = async (reset=0) => {
    if (currentUser) {
        if (currentUser.profileImage) {
            try {
              if (cursorVal<=maxScroll){
                const dataurl = API_ENDPOINTS.FETCHCONVERSATIONS + "/" + currentUser._id;
                const response = await axios.get(dataurl,{
                  params: {
                    cursorVal: reset === 0 ? cursorVal : 0
                  }
              });
              console.log("anurima vaishnavi kumar!!!!");
              console.log(response.data.cursorVal,"cursorval");
              setCursorVal(response.data.cursorVal);
              setScroll(false);
              setMaxScroll(response.data.maxcursorVal);
              if (reset === 0) {
                setConversations(response.data.sortedRooms,0);
            } else {
                setConversations(response.data.sortedRooms,1);
            }                        
            }
               
            } catch (error) {
                console.error("Error fetching conversations:", error);
            }
        } else {
            history.push("/SignIn");
        }
    }
};

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const sendMessage = () => {
    if (message && username && recv) {
      socket.emit('chat message', { username, message ,recv});
      setMessage('');
    }else if (message && username ){
      socket.emit('chat message', { username, message ,recv});
      setMessage('');
    }
  };
  // const parsedObject = JSON.parse(localStorage.getItem('userdata'));

  return (
    <Layout>
       <div className='maincontainer'>
        <div className="connectioncontainer">
          {conversations &&<Connections
            currentUser={currentUser}
            changeChat={handleChatChange}
            onlineUserIds={onlineUserIds}
            conversations={conversations}
            setChatBanner={setChatBanner}
            socket={socket}
          />}
          {conversations && isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              isLoaded={isLoaded}
              currentUser={currentUser}
              socket={socket}
              images = {chatBanner}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}




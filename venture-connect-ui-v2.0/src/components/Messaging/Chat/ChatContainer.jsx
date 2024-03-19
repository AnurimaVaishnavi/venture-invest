import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Avatar as MuiAvatar } from '@mui/material';
import { Avatar } from 'flowbite-react';
import API_ENDPOINTS from "../../../utils/api";
import UserProfile from "../../../../pages/session";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

// current users will be in the list store in zustand store
//store current chat in zustand store
export default function ChatContainer({
  currentChat,
  isLoaded,
  currentUser,
  socket,
  images
}) {
  const [readMessages, setReadMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [showIndicator, setShowIndicator] = useState(true);
  const scrollRef = useRef();
  const mainRef = useRef();
  let max_scrolled=0;
  const [count, setCount] = useState(0);
  const handleSendMsg = async (msg, isFile) => {
    if(isFile) {
      await axios.post(API_ENDPOINTS.PROFILEPICUPLOAD, {
        message: msg
      }, {
        headers: {
        "Content-Type": "multipart/form-data"
      }})
    } else {
      await axios.post(API_ENDPOINTS.SENDMESSAGE, {
        roomId: currentChat.room_id,
        userId: currentUser._id,
        message: msg,
      }).then((response) => {
        console.log(response);
        socket.emit("send-msg",  {
          roomId: currentChat.room_id,
          messageId: response.data.id 
        },
          );
      });
    }
  };

  const scrollToBottom = () => {
    mainRef.current?.scrollIntoView({
      behavior: "smooth",
    });      
  };
  
  socket.on("message-typing", () =>{

  });

  socket.off("message-notification").on("message-notification", (data) => {
    const new_message = data;
    console.log(new_message,"new new new");
    if (new_message.sender!=currentUser._id){
      setCount(prevCount => prevCount + 1);
      mainRef.current?.scrollIntoView({
        behavior: "smooth"
      });
      setUnreadMessages(prevUnreadMessages => [...prevUnreadMessages,new_message]);
      setShowIndicator(true);
      console.log(count);
    }else{
      setReadMessages(prevReadMessages => [...prevReadMessages,new_message]);
      socket.emit("read-all-room-messages",{
        roomId: currentChat.room_id,
        userId: currentUser._id,
      },)
    }
    
    socket.emit('fetch-conversations', {userId: currentUser._id})
  });
  useEffect(() => {
    if (currentChat) {
      const fetchData = async () => {
        const response = await axios.post(API_ENDPOINTS.FETCHMESSAGES, {
          roomId: currentChat.room_id,
          userId: currentUser._id,
        });
        console.log(response);
        let read_messages = response.data.readMessages;
        let unread_messages = response.data.unread_messages;
        console.log(read_messages, unread_messages,"messages both read and unread");
        UserProfile.setInitialResponses(read_messages.length);
        setReadMessages(read_messages);
        setUnreadMessages(unread_messages);
        setCount(unread_messages.length);
      };
      fetchData();
    }
  }, [currentChat]);

  useEffect(() => {
    if (readMessages.length == UserProfile.getInitialResponses()){
      scrollRef.current?.scrollIntoView({
        behavior: "smooth"
      });      
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
          setReadMessages(prevMessages => [...prevMessages, ...unreadMessages]);
          setUnreadMessages([]);
          setCount(0);
          setShowIndicator(false);
          socket.emit("read-all-room-messages",{
            roomId: currentChat.room_id,
            userId: currentUser._id,
          },
          );
          }, 10000)
        }
      });
    });
    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }
    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current);
      }
    };
  }, [unreadMessages]);


  return (
    <>
      {isLoaded && currentChat && (
        <Container>
          <div className="chat-header"  style={{borderBottom:"0.5px solid #8e8fa0"}}>
            <div className="user-details">
            <Avatar.Group>
            {
              images.map((profileImage)=>{
                console.log(profileImage);
                return (<Avatar img={API_ENDPOINTS.PROFILEPICVIEW+profileImage} rounded stacked/>);
              })
            }
            </Avatar.Group> 
              <div className="username">
                <h5>{currentChat.group_key}</h5>
              </div>
            </div>
          </div>
          <div ref={mainRef}  className="chat-messages">
            {readMessages && readMessages.length>0 && readMessages.map((message) => { 
              return (
                <div key={uuidv4()}>
                  <div
                    className={`message ${
                      message.sender==currentUser._id ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content" style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: '10px' }}>
                    <Avatar.Group>
                      <Avatar img={API_ENDPOINTS.PROFILEPICVIEW + message.profileImage} rounded stacked />
                    </Avatar.Group>
                    </div>
                    <div>
                      <p>{message.message.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
           {
           unreadMessages.length > 0 && showIndicator && (
           <p ref={scrollRef} style={{ textAlign: "center", fontWeight: "bold" }}>
            {"Unread messages: " + unreadMessages.length}
          </p>
          )}
            {unreadMessages && unreadMessages.length>0 && unreadMessages.map((message) => {      
              return (
                <div key={uuidv4()}>
                  <div
                    className={`message ${
                      message.sender==currentUser._id ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content" style={{ display: 'flex', alignItems: 'center' }} >
                      <div style={{ marginRight: '10px' }}>
                    <Avatar.Group>
                      <Avatar img={API_ENDPOINTS.PROFILEPICVIEW + message.profileImage} rounded stacked />
                    </Avatar.Group>
                    </div>
                    <div>
                      <p>{message.message.text}</p>
                    </div>
                    </div>
                  </div>
                </div>
              );
            })}
         <div className="down-arrow-container" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '999' }}>
         <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={scrollToBottom}>
           <KeyboardDoubleArrowDownIcon />
           <span style={{ marginLeft: '5px', zIndex: '100' }}>{count}</span>
          </div>
          </div>
          </div>
          <ChatInput handleSendMsg={handleSendMsg} socket={socket}
          roomId = {currentChat.room_id} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 5%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 65% 0%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          // color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        //color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        color:white;
        background-color: #0d6efd;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #e7e9eb;
        color:black;
      }
    }
  }
`;
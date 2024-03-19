import {useState,useEffect} from 'react';
import React from 'react';
import styled from "styled-components";
import API_ENDPOINTS from '../../../utils/api';
import { Avatar } from 'flowbite-react';
// import { Routes, Route, Navigate, useLocation,Link, Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Modal from 'react-bootstrap/Modal'
import GroupsIcon from '@mui/icons-material/Groups';
import NewMessage from './CreateMessage';
import {useMessagingStore} from './MessagingStore';
//todo - create socket inside a store - user details also
export default function  Connections({ currentUser, changeChat, onlineUserIds, setChatBanner, socket})  {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [createMessage, setCreateMessage] = useState(false);
    const [groupMessage, setGroupMessage] = useState(false);
    const conversations = useMessagingStore(state => state.conversations);
    const [connections, setConnections] = useState(conversations);
    const setConversations = useMessagingStore(state => state.setConversations);
    const setScroll = useMessagingStore(state => state.setScroll);
    useEffect(() => {
      if (typeof window !== "undefined"){
        const parsedObject = JSON.parse(localStorage.getItem('userdata'));
      }
      if (currentUser) {
        setCurrentUserImage(currentUser.profileImage);
        setCurrentUserName(currentUser.username);
        if (conversations.length > 0){
          console.log(conversations,"conversations")
          setChatBanner(conversations[0].profileImages);
          changeCurrentChat(0, conversations[0]);
        }
        
      }
    }, [currentUser,conversations]);

    const changeCurrentChat = (index, contact) => {
      setCurrentSelected(index);
      changeChat(contact);
    };
    const handleChatButtonClick = () => {
      setCreateMessage(true);
    };
    const handleGroupButtonClick = () => {
      setGroupMessage(true);
    };
    const handleCloseModal = () => {
      setGroupMessage(false);
    };
    const handleScroll = (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target;
      setScroll(scrollTop + clientHeight >= scrollHeight * 0.5);
      console.log(scrollTop + clientHeight >= scrollHeight * 0.5,"check true or false");
    }
    return (
      <>
        {currentUserImage && currentUserName && (
          <Container>
            <div className="brand">
              {/* <h5>Connections</h5> */}
            </div>
            <div className="contacts">
            <div className="header">
            <div className="left">
            {/* {parsedObject &&<p className="username">{parsedObject.username}</p>}
            {parsedObject && <Avatar className="avatar" alt={parsedObject.username.substring(0,2)} src={API_ENDPOINTS.PROFILEPICVIEW+parsedObject.profileImage} />} */}
            </div>
            <div className="right" style={{marginLeft: "30px"}}>
            <GroupsIcon style={{marginLeft: "10px"}} onClick={handleGroupButtonClick}/>
            <Modal size="md" animationType="slide" centered={true} scrollable={true} transparent={true} show={groupMessage} onClose={handleCloseModal}>
              <NewMessage connections={connections} setConnections={setConnections} heading="New group" text="Create Group" type="group" closeModal={handleCloseModal}
              socket={socket}
              currentUser={currentUser} />
            </Modal>
            <ChatBubbleIcon className="chat-button" style={{marginLeft: "12px"}} onClick={handleChatButtonClick} />
            <Modal size="md" animationType="slide" centered={true} scrollable={true} transparent={true} show={createMessage} onClose={() => setCreateMessage(false)}>
              <NewMessage connections={connections} setConnections={setConnections} heading="New message" text="Chat" type="chat" 
              socket={socket}
              currentUser={currentUser}/>
            </Modal>
            </div>
            </div>
            <div className='conversation-list' 
            style={{ overflowY: "auto", height: "400px" }}
            onScroll={handleScroll}>
              {conversations && conversations.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    // style={{ borderLeft: `6px solid ${onlineUserIds[contact._id] ? "#00800096" : "#ff00004f" }`, 
                    //          borderRight: `6px solid ${onlineUserIds[contact._id] ? "#00800096" : "#ff00004f" }`,
                    //          display: currentUser._id===contact._id ? "none" : ""
                    //       }}

                    style={{  
                          display: currentUser._id===contact._id ? "none" : "",
                       }}
                    // onScroll={handleScroll}
                    onClick={() => {
                      setChatBanner(contact.profileImages)
                      changeCurrentChat(index, contact)}}
                  >
                    {/* <div className="avatar">
                      <img
                        src={API_ENDPOINTS.PROFILEPICVIEW+contact.profileImage}
                        alt=""
                      />
                    </div> */}
                    <div className="flex flex-wrap gap-2">
                      <Avatar.Group>
                      {
                        contact.profileImages.map((profileImage)=>{
                          console.log(profileImage);
                          return (<Avatar img={API_ENDPOINTS.PROFILEPICVIEW+profileImage} rounded stacked/>);
                        })
                      }
                      </Avatar.Group> 
                      </div>
                    <div className="username">
                      <h6>{contact.group_key}</h6>
                  </div>
                  <div className='lastMessage'>
                    {/* <h6>{contact.lastReadMessage}</h6> */}
                  </div>
                  </div>
                );
              })}
            </div>
            </div>
            {/* <div className="current-user">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div> */}
          </Container>
        )}
      </>
    );
  }
  const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    // background-color: #080420;
    .brand {
      border-right:0.5px solid #8e8fa0;
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
      img {
        height: 2rem;
      }
      h3 {
        // color: white;
        text-transform: uppercase;
      }
    }
    .header {
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      margin-left: -30%
      background-color: #f0f0f0;
      // margin-top: 0%;
  }
  
  .left {
      display: flex;
      align-items: center;
      margin-left: 120px;
  }
  
  .username {
      margin-right: 10px;
      font-weight: bold; 
  }
  .lastMessage{
    margin-right: 50px;
    font-weight: bold; 
  }
  
  .right {
      display: flex;
      align-items: center;
  }
  .group-button{
    margin-left: 99px;
  }
  
  .chat-button {
      margin-left: 100px;
  }
  
  
    .contacts {
      border-right:0.5px solid #8e8fa0;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      gap: 0.8rem;
      &::-webkit-scrollbar {
        width: 0.1rem;
        &-thumb {
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      .contact {
        overflow-wrap: anywhere;
        background-color: #ffffff34;
        min-height: 5rem;
        cursor: pointer;
        width: 80%;
        border-radius: 0.2rem;
        padding: 0.4rem;
        display: flex;
        gap: 1rem;
        width: 100%;
        align-items: center;
        transition: 0.5s ease-in-out;
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
      .selected {
        border-left:3px solid #0d6efd;
        background-color: #e7e9eb;
      }
    }
    .current-user {
      overflow-wrap: anywhere;
      background-color: #0d0d30;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      .avatar {
        img {
          height: 4rem;
          max-inline-size: 100%;
        }
      }
      .username {
        h2 {
          color: white;
        }
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        .username {
          h2 {
            font-size: 1rem;
          }
        }
      }
    }
  `;
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearIcon from "@mui/icons-material/Clear";


export default function ChatInput({ handleSendMsg,socket, roomId}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const [isFile, setIsFile] = useState(false);
  const [fileState, setFileState] = useState("");


  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += (emoji.emoji?emoji.emoji:event.emoji);
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (isFile) {
      handleSendMsg(fileState, true)
    } else if (msg.length > 0) {
      handleSendMsg(msg, false);
      setMsg("");
    }
  };

  useEffect(() => {
    if (fileState) {
      setMsg(fileState.name);
      setIsFile(true);
    }
  }, [fileState]);

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} color="#fbbc04" />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <label htmlFor="input-file" style={{cursor: "pointer" }}>
        <AttachFileIcon />
        <input
          id="input-file"
          type="file"
          hidden
          accept="*"
          onChange={(e) => setFileState(e.target.files[0])}
        />
      </label>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => {
            socket.emit("typing",{
              roomId: roomId,
            });
            setMsg(e.target.value)
          }}
          disabled={isFile}
        />
        <ClearIcon
          sx={{
            display: isFile ? "" : "none",
            cursor: "pointer",
          }}
          onClick={() => {
            setIsFile(false);
            setMsg("");
          }}
        />
        <button className="submit">
          <IoMdSend color="white"/>
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  grid-template-columns: 5% 95%;
  //background-color: #080420;
  padding: 0 2rem;
  gap: 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    // color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #e7e9eb;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      // color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      cursor: pointer;
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #0d6efd;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        // color: white;
      }
    }
  }
`;
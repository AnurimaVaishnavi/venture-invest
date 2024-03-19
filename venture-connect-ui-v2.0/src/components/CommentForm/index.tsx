import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {Textarea} from "@nextui-org/react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './CommentForm.module.scss';
import { MdOutlineSend } from "react-icons/md";
import AvatarWithTextbox from '../AvatarWithTextbox';
import styles from './CommentForm.module.scss';
import API_ENDPOINTS from '../../utils/api';
import UserProfile from '../../../pages/session';
const CommentForm = ({ label="add", initialValue="" ,commentId=null, postId, func, parentId = null, level  }) => {
  const [message, setMessage] = useState(initialValue)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (label === "add") {
     func(message, postId, level, parentId);
      setMessage("");
    } else {
      func(message, commentId);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div  className={styles.textareaContainer}>
      <AvatarWithTextbox image={API_ENDPOINTS.PROFILEPICVIEW+UserProfile.getUserData().profileImage} level={level} type = {"commentForm"} height={100} setMessage={setMessage} message = {message} visible={false} text="Add your comment..."/>
      {message && <button className={styles.postButton} type="submit">
        Post
      </button>}
      </div>
    </form>
  );
};
export default CommentForm;

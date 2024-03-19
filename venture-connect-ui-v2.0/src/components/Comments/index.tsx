import { useState, useEffect } from "react";
import CommentForm from "../CommentForm";
import Comment from "../Comment";
import './Comments.module.scss';
import axios from 'axios';
import API_ENDPOINTS from '../../utils/api';

const Comments = (props) => {
  const [comments, setComments] = useState(props.comments);
  const [activeComment, setActiveComment] = useState(null);
  const parsedObject = JSON.parse(localStorage.getItem('userdata'));
  useEffect(() => {
  }, [comments]);
  
  const addComment = async (message,postId,level,parentId) => {
    const form_obj = {
      body: message,
        postId: postId,
        level: level,
        parentId: parentId,
        author_id: parsedObject._id,
    };
    axios.post(API_ENDPOINTS.COMMENTS_ADD, form_obj).then((response) => {
      console.log(response.data.response);
      setComments([response.data.response, ...comments]);
      setActiveComment(null);
    }).catch((err) => {
      console.error("Failed to add comment:", err);
    })
  };

  const updateComment = async (body, commentId) => {
    try {
      const form_obj = {
        body: body,
        commentId: commentId,
      }
      axios.post(API_ENDPOINTS.COMMENTS_UPDATE, form_obj).then((response) => {
        setComments(
          comments.map((comment) =>
            comment.id === commentId ? { ...comment, body: response.data.updatedComment.body } : comment
          )
        );
        setActiveComment(null);
      })
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  // Delete comment
  const handleDeleteComment = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (confirmed) {
      try {
        const response = await axios.post(API_ENDPOINTS.COMMENTS_DELETE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(id),
        });
        const newComments = comments.filter((comment) => comment.id !== id);
        setComments(newComments);
        console.log(`Comment ${id} deleted successfully.`);
      } catch (error) {
        console.error(`Failed to delete comment ${id}:`, error);
      }
    }
  };
  return (
    <div className="comments" style={{ width: '100%', height: '500px', overflowY: "auto" }}>
      {comments.length !== 0 && (
        <>
          <CommentForm level={0} postId={props.post_id} func={addComment}/>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              updateComment={updateComment}
              deleteComment={handleDeleteComment}
              currentUserId={props.userId}
              post_id = {props.post_id}
            />
          ))}
        </>
      )}
    </div>
  );
};
  
export default Comments;

import {Comment} from '../models/commentsschema.js';
import {Post} from '../models/postsschema.js';
import mongoose from 'mongoose';
import {userschema} from "../models/userschema.js";
function commentSocket(io) {
    io.on('connection', (socket) => {
        socket.on("live-comment", async (data) => {
                        
        })
    });
};

const addComment = (req, res) => {
    const authorId = new mongoose.Types.ObjectId(req.author_id);
    const comment  = new Comment({ ...req, author_id: authorId });
    comment.save().then(comment => {
    userschema.findOne({ _id: comment.author_id }).then((user_details) => {
        const response = {id: comment._id,
                body: comment.body,
                author: {
                    avatar: user_details ? user_details.profileImage : "",
                    name: user_details ? user_details.username : "",
                    id: user_details ? user_details._id: "",
                },
                updatedTime: comment.updatedAt,
                repliesCount: comment.repliesCount,
                level: comment.level
        };
        res.status(200).json({response});
        })
        console.log("successfully added");
    })
    Post.findOneAndUpdate(
        { _id: req.postId },
        { $push: { comments: comment._id } }
    )
    .catch((err) => {
        console.log(err);
    })
}

const updateComment = async (req, res) => {
    Comment.findOneAndUpdate(
        { _id: req.commentId },
        { body: req.body },
        { new: true })
      .then(updatedComment => {
        console.log("Updated comment:", updatedComment);
        res.status(200).json({updatedComment});
      })
      .catch(error => {
        console.error('Error updating comment:', error);
      });
      
}
const getComments = async (req, res) => {
    let topLevelComments = []
    if (req.object_type == "POST"){
        const postid = req.id;
        const post = await Post.findOne({_id: postid});
        const populated = await post.populate('comments');
        topLevelComments = populated.comments.filter(comment => !comment.parentId && comment.state == "active");
    }else{
        const comment_id = req.id;
        const comment = await Comment.findOne({_id: comment_id});
        const populated = await comment.populate('childComments');
        topLevelComments= populated.comments.filter(comment => (comment.parentId == comment_id && comment.state == "active"));
    }
    const populatedTopLevelComments = [];
    for (const comment of topLevelComments) {
        const populatedComment = await Comment.populate(comment, { path: 'likes' });
        populatedTopLevelComments.push(populatedComment);
    }
    console.log(populatedTopLevelComments);
    const formattedComments = await Promise.all(populatedTopLevelComments.map((comment) => {
        return userschema.findOne({ _id: comment.author_id }).then((user_details) => {
            return {
                id: comment._id,
                body: comment.body,
                author: {
                    avatar: user_details ? user_details.profileImage : "",
                    name: user_details ? user_details.username : "",
                    id: user_details ? user_details._id: "",
                },
                updatedTime: comment.updatedAt,
                repliesCount: comment.repliesCount,
                level: comment.level,
            };
        });
    }));
    console.log(formattedComments);
    res.status(200).json({topLevelComments: formattedComments});
}

const deleteComment = async (req, res) => {
    const commentId = req.body._id;
    if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(400).json({ message: 'Invalid comment ID' });
    }
    const doc = await Comment.findOne({_id: commentId});
    doc.state = 'inactive';
    await doc.save();
    const parent = await Comment.findOne({_id: doc.parentId});
    if (!parent) {
        return res.status(404).json({ message: 'Parent comment not found' });
    }
    parent.childComments.pull(commentId);
    parent.repliesCount -= 1;
    await parent.save();
    res.status(200).json({ message: 'Comment deleted successfully' });
}

export {
    addComment,
    updateComment,
    getComments,
    deleteComment,
    commentSocket
};
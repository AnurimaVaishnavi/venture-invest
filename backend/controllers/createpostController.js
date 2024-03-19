import { Post } from "../models/postsschema.js";
import mongoose from 'mongoose';

function createpost(req, res) {
  const authorId = new mongoose.Types.ObjectId(req.author_id);
  const userdata = new Post({ ...req, author_id: authorId });
  userdata.save().then(function (response) {
    if (response) {
      res.send({
        "message": "success",
        "code": "200",
        "status": "OK"
      });
    } else {
      res.send({
        "message": "something went wrong",
        "code": "201",
        "status": "ERROR"
      });
    }
  });
}

export { createpost };

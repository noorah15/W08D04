const express = require("express");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const {
  addCommnet,
  updateComment,
  delComment,
  getComment,
} = require("./../controllers/comments.js");
const postRoter = express.Router();

//general
postRoter.get("/getComment/:id", getComment);

//user
postRoter.post("/addCommnet", addCommnet);
postRoter.put("/updateComment", updateComment);
postRoter.delete("/delComment", delComment);

//for admin
// userRouter.get("/users", authentication, authorization, getUsers);
// userRouter.delete("/delUsers", authentication, authorization, delUser);
module.exports = postRoter;

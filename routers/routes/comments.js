const express = require("express");
const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  userAuthorization,
} = require("../middlewares/authorization");

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
postRoter.post("/addCommnet", authentication, userAuthorization, addCommnet);
postRoter.put(
  "/updateComment",
  authentication,
  userAuthorization,
  updateComment
);
postRoter.delete("/delComment", authentication, userAuthorization, delComment);

//for admin
postRoter.delete(
  "/delCommentByAdmin",
  authentication,
  adminAuthorization,
  delComment
);
module.exports = postRoter;

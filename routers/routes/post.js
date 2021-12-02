const express = require("express");
const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  userAuthorization,
} = require("../middlewares/authorization");

const {
  addPost,
  updatePost,
  delPost,
  getAllPosts,
  getAllPostsForUser,
  getPostForUser,
} = require("./../controllers/post.js");
const postRoter = express.Router();

//general
postRoter.get("/getAllPosts", getAllPosts);
postRoter.get("/getAllPostsForUser/:id", getAllPostsForUser);
postRoter.get("/getPostForUser/:id", getPostForUser);

//user
postRoter.post("/addPost", authentication, userAuthorization, addPost);
postRoter.put("/updatePost", authentication, userAuthorization, updatePost);
postRoter.delete("/delPost", authentication, userAuthorization, delPost);

//for admin
postRoter.delete(
  "/delPostByAdmin",
  authentication,
  adminAuthorization,
  delPost
);
module.exports = postRoter;

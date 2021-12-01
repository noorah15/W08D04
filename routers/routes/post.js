const express = require("express");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

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
postRoter.post("/addPost", addPost);
postRoter.put("/updatePost", updatePost);
postRoter.delete("/delPost", delPost);

//for admin
// userRouter.get("/users", authentication, authorization, getUsers);
// userRouter.delete("/delUsers", authentication, authorization, delUser);
module.exports = postRoter;

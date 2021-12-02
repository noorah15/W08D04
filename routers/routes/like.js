const express = require("express");
const { addLike, removeLike } = require("./../controllers/like.js");
const likeRouter = express.Router();
const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  userAuthorization,
} = require("../middlewares/authorization");

likeRouter.post("/addLike", authentication, userAuthorization, addLike);
likeRouter.delete("/removeLike", authentication, userAuthorization, removeLike);

module.exports = likeRouter;

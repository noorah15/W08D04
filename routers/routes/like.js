const express = require("express");
const { addLike, removeLike } = require("./../controllers/like.js");
const likeRouter = express.Router();

likeRouter.post("/addLike", addLike);
likeRouter.delete("/removeLike", removeLike);

module.exports = likeRouter;

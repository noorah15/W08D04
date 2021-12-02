const mongoose = require("mongoose");

const likes = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users2" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  isDel: { type: Boolean, default: false },
});

module.exports = mongoose.model("likes", likes);

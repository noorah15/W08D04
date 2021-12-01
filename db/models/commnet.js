const mongoose = require("mongoose");

const comments = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users2" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  desc: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isDel: { type: Boolean, default: false },
});

module.exports = mongoose.model("comments", comments);

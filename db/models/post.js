const mongoose = require("mongoose");

const posts = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users2" },
  img: { type: String, required: true, trim: true },
  desc: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "users2" },
    { type: Boolean, default: false },
  ],
  isDel: { type: Boolean, default: false },
});

module.exports = mongoose.model("posts", posts);

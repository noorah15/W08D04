const mongoose = require("mongoose");

const comments = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users2" },
  username: { type: String, trim: true },
  avter: {
    type: String,
    default:
      "https://icon-library.com/images/avatar-icon-png/avatar-icon-png-15.jpg",
  },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  desc: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isDel: { type: Boolean, default: false },
});

module.exports = mongoose.model("comments", comments);

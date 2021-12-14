const mongoose = require("mongoose");

const posts = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users2" },
  username: { type: String, trim: true },
  avter: {
    type: String,
    default:
      "https://icon-library.com/images/avatar-icon-png/avatar-icon-png-15.jpg",
  },
  img: { type: String, required: true, trim: true },
  desc: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  likes: { type: Array },
  isDel: { type: Boolean, default: false },
});

module.exports = mongoose.model("posts", posts);

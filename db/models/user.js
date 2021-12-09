const mongoose = require("mongoose");

const users = new mongoose.Schema({
  email: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  avter: {
    type: String,
    default:
      "https://icon-library.com/images/avatar-icon-png/avatar-icon-png-15.jpg",
  },
  isDel: { type: Boolean, default: false },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

module.exports = mongoose.model("users2", users);

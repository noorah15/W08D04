const mongoose = require("mongoose");

const role = new mongoose.Schema({
  role: { type: String, required: true, trim: true },
  permissions: { type: Array, required: true },
});

module.exports = mongoose.model("role", role);

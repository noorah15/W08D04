const mongoose = require("mongoose");
const Joi = require("joi");

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
  verified: { type: Boolean, default: false },
});

// const validate = (user) => {
//   const schema = Joi.object({
//     name: Joi.string().min(3).max(255).required(),
//     email: Joi.string().email().required(),
//   });
//   return schema.validate(user);
// };

// const users = mongoose.model("users2", users);

// module.exports = {
//   User,
//   validate,
// };

module.exports = mongoose.model("users2", users);

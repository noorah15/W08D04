const express = require("express");
const authentication = require("../middlewares/authentication");
const { adminAuthorization } = require("../middlewares/authorization");

const {
  register,
  login,
  getUsers,
  delUser,
  verify,
} = require("./../controllers/user.js");
const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);
userRouter.get("/verify/:id", verify);

//for admin
userRouter.get("/users", authentication, adminAuthorization, getUsers);
userRouter.delete("/delUsers", authentication, adminAuthorization, delUser);
module.exports = userRouter;

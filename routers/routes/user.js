const express = require("express");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const {
  register,
  login,
  getUsers,
  delUser,
} = require("./../controllers/user.js");
const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);

//for admin
userRouter.get("/users", authentication, authorization, getUsers);
userRouter.delete("/delUsers", authentication, authorization, delUser);
module.exports = userRouter;

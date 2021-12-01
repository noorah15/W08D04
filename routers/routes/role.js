const express = require("express");
const { addRole, getRoles } = require("./../controllers/role.js");
const roleRouter = express.Router();

roleRouter.post("/addRole", addRole);
roleRouter.get("/getRoles", getRoles);

module.exports = roleRouter;

const roleModel = require("./../../db/models/role");
const userModel = require("./../../db/models/user");

const authorization = async (req, res, next) => {
  const result = await roleModel.findById(req.token.role);
  if (result.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "forbidden" });
  }
};

module.exports = authorization;

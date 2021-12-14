const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db.js");

const app = express();
app.use(express.json()); //{ limit: "50mb" }
app.use(cors());

const role = require("./routers/routes/role");
app.use(role);

const user = require("./routers/routes/user");
app.use("/user", user);

const post = require("./routers/routes/post");
app.use("/post", post);

const comments = require("./routers/routes/comments");
app.use("/comments", comments);

const like = require("./routers/routes/like");
app.use("/like", like);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});

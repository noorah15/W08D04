const userModel = require("./../../db/models/user");
const postModel = require("./../../db/models/post");

const addPost = (req, res) => {
  const { user, img, desc } = req.body;

  const newPost = new postModel({
    user,
    img,
    desc,
  });

  newPost
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const updatePost = (req, res) => {
  const { postId, img, desc } = req.body;
  let doc = "";
  if (img !== undefined) {
    doc = await userModel.updateOne(
      { _id: postId },
      { img: img, timestamp: Date.now }
    );
  }
  if (desc !== undefined) {
    doc = await userModel.updateOne(
      { _id: postId },
      { desc: desc, timestamp: Date.now }
    );
  }

  res.status(200).json(doc);
};

const delPost = (req, res) => {
  const { postId } = req.body;

  let doc = await userModel.updateOne({ _id: postId }, { isDel: true });
  if (doc) res.status(200).json(doc);
  else res.status(400).json("Post not found");
};

const getAllPosts = (req, res) => {
  postModel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getAllPostsForUser = (req, res) => {
  const { id } = body.params;
  postModel
    .find({ user: id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getPostForUser = (req, res) => {
  const { id } = body.params;
  postModel
    .find({ _id: id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  addPost,
  updatePost,
  delPost,
  getAllPosts,
  getAllPostsForUser,
  getPostForUser,
};

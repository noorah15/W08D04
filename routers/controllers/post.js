const likeModel = require("./../../db/models/like");
const postModel = require("./../../db/models/post");
const commentModel = require("./../../db/models/commnet");

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
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updatePost = async (req, res) => {
  try {
    const { postId, img, desc } = req.body;
    let doc = "";
    if (img !== undefined) {
      doc = await postModel.updateOne({ _id: postId }, { img: img });
      console.log(doc);
    }
    if (desc !== undefined) {
      doc = await postModel.updateOne({ _id: postId }, { desc: desc });
      console.log(doc);
    }

    res.status(200).json(doc);
  } catch (err) {
    res.status(200).json(err);
  }
};

const delPost = async (req, res) => {
  const { postId } = req.body;

  try {
    let doc = await postModel.updateOne({ _id: postId }, { isDel: true });
    ires.status(200).json(doc);
  } catch (err) {
    res.status(400).json("Post not found");
  }
};

const getAllPosts = (req, res) => {
  postModel
    .find({ isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getAllPostsForUser = (req, res) => {
  const { id } = req.params;
  postModel
    .find({ user: id, isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getPostForUser = (req, res) => {
  const { id } = req.params;
  postModel
    .find({ _id: id, isDel: false })
    .then((result) => {
      if (result.length > 0) {
        let like = "1234";
        let comment = "";

        likeModel
          .find({ postId: id, isDel: false })
          .then((result) => {
            like = result;
            console.log(like);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
        console.log(like);

        commentModel
          .find({ postId: id, isDel: false })
          .then((result) => {
            comment = result;
          })
          .catch((err) => {
            res.status(400).send(err);
          });

        res.status(200).json({ result, like, comment });
      } else res.status(400).json("not found");
    })
    .catch((err) => {
      res.status(400).send(err);
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

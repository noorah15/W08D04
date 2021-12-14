const likeModel = require("./../../db/models/like");
const postModel = require("./../../db/models/post");
const commentModel = require("./../../db/models/commnet");
const userModel = require("./../../db/models/user");

const addPost = (req, res) => {
  const { user, img, desc, username, avter } = req.body;
  console.log(user + " " + img + " " + desc);

  const newPost = new postModel({
    user,
    img,
    desc,
    username,
    avter,
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
    res.status(400).json(err);
  }
};

const delPost = async (req, res) => {
  const { postId } = req.body;

  try {
    let doc = await postModel.updateOne({ _id: postId }, { isDel: true });
    res.status(200).json(doc);
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
    .then(async (result) => {
      if (result.length > 0) {
        let like = await likeModel.find({ postId: id, isDel: false });
        let comment = await commentModel.find({ postId: id, isDel: false });
        let user = await userModel.find({}).select("username avter _id");

        // likeModel
        //   .find({ postId: id, isDel: false })
        //   .then((result) => {
        //     like = result;
        //     console.log(like);
        //   })
        //   .catch((err) => {
        //     res.status(400).send(err);
        //   });
        // console.log(like);

        // commentModel
        //   .find({ postId: id, isDel: false })
        //   .then((result) => {
        //     comment = result;

        //   })
        //   .catch((err) => {
        //     res.status(400).send(err);
        //   });

        res.status(200).json({ result, like, comment, user });
      } else res.status(400).json("not found");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const setLike = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const post = await postModel.findById(postId);

    if (post) {
      const found = post.likes.find((item) => {
        return item.user === userId;
      });

      if (found) {
        console.log(post);
        post.likes.forEach((element) => {
          if (element.user === userId) {
            console.log(element.isLike);
            element.isLike === true
              ? (element.isLike = false)
              : (element.isLike = true);
            console.log(element.isLike);
          }
        });

        post.markModified("likes");
        await post.save();
        res.status(200).json(post);
      } else {
        post.likes.push({ user: userId, isLike: true });
        await post.save();
        res.status(200).json(post);
      }
    } else {
      res.status(400).json("not found");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  addPost,
  updatePost,
  delPost,
  getAllPosts,
  getAllPostsForUser,
  getPostForUser,
  setLike,
};

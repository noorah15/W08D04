const commentModel = require("./../../db/models/commnet");
const postModel = require("./../../db/models/post");

const addCommnet = (req, res) => {
  const { userId, postId, desc } = req.body;

  const newComment = new commentModel({
    userId,
    postId,
    desc,
  });

  newComment
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const updateComment = async (req, res) => {
  const { commnetId, desc } = req.body;
  try {
    let doc = await commentModel.updateOne({ _id: commnetId }, { desc: desc });
    if (doc) res.status(200).json(doc);
    else res.status(400).json("Comment not found");
  } catch (err) {
    res.status(400).json("Comment not found");
  }
};

const delComment = async (req, res) => {
  const { commnetId } = req.body;

  try {
    let doc = await commentModel.updateOne({ _id: commnetId }, { isDel: true });
    if (doc) res.status(200).json(doc);
    else res.status(400).json("Comment not found");
  } catch (err) {
    res.status(400).json("Comment not found");
  }
};

const getComment = (req, res) => {
  const { id } = req.params;
  commentModel
    .findOne({ _id: id, isDel: false })
    .then((result1) => {
      postModel
        .findOne({ _id: result1.postId, isDel: false })
        .then((result2) => {
          let arr = [];
          arr.push(result1);
          if (result2 === null) arr.push("can't find post");
          else arr.push(result2);
          res.status(400).json(arr);
        })
        .catch((err) => {
          res.status(400).send(err);
        });

      //res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  addCommnet,
  updateComment,
  delComment,
  getComment,
};

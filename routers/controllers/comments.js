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

const updateComment = (req, res) => {
  const { commnetId, desc } = req.body;
  let doc = await userModel.updateOne({ _id: commnetId }, { desc: desc });
  if (doc) res.status(200).json(doc);
  else res.status(400).json("Comment not found");
};

const delComment = (req, res) => {
  const { commnetId } = req.body;

  let doc = await userModel.updateOne({ _id: commnetId }, { isDel: true });
  if (doc) res.status(200).json(doc);
  else res.status(400).json("Comment not found");
};

const getComment = (req, res) => {
  const { id } = req.params;
  commentModel
    .find({ _id: id })
    .then((result1) => {
      postModel
        .find({ _id: result1.postId })
        .then((result2) => {
          let arr = [];
          arr.push(result1);
          arr.push(result2);
          res.json(arr);
        })
        .catch((err) => {
          res.send(err);
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

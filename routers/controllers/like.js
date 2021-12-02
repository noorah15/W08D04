const likeModel = require("./../../db/models/like");

const addLike = async (req, res) => {
  const { userId, postId } = req.body;

  likeModel
    .findOne({ userId: userId, postId: postId })
    .then((result) => {
      // const found = await likeModel.findOne({ userId: userId, postId: postId });

      console.log(result);
      if (result) res.status(400).send("Like is exist");
      else {
        const newLike = new likeModel({
          userId,
          postId,
        });

        newLike
          .save()
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const removeLike = async (req, res) => {
  const { likeId } = req.body;

  try {
    let doc = await likeModel.updateOne({ _id: likeId }, { isDel: true });
    if (doc) res.status(200).json(doc);
    else res.status(400).json("Comment not found");
  } catch (err) {
    res.status(400).json("Comment not found");
  }
};

module.exports = {
  addLike,
  removeLike,
};

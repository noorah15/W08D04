const postModel = require("./../../db/models/post");

const addLike = (req, res) => {
  const { userId, postId } = req.body;

  postModel
    .find({ _id: postId })
    .then((result) => {
      // PersonModel.update(
      //   { _id: person._id },
      //   { $push: { friends: friend } },
      //   done
      // );

      result.likes.push(userId);
      result.save(done);

      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const removeLike = (req, res) => {
  const { postId } = req.body;

  postModel
    .find({ _id: postId })
    .then((result) => {
      // PersonModel.update(
      //   { _id: person._id },
      //   { $push: { friends: friend } },
      //   done
      // );

      if (result) {
        result.likes.isDel = true;
        result.save(done);
        res.status(200).json(doc);
      } else res.status(400).json("Post not found");
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  addLike,
  removeLike,
};

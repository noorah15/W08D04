const postModel = require("./../../db/models/post");

const addLike = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const newLike = await postModel.findOne({ _id: postId });
    //console.log(newLike);
    newLike.likes.push(userId);
    newLike.save();

    res.status(200).json(newLike);
  } catch (err) {
    res.status(400).json(err);
  }
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

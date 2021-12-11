const userModel = require("./../../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("./../../utils/email");
//const userModel = users;

const SALT = Number(process.env.SALT);
const secretKey = process.env.secretKey;

const register = (req, res) => {
  const { email, username, password, avter, role } = req.body;

  const savedEmail = email.toLowerCase().trim();

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(savedEmail).toLowerCase().trim()))
    res.status(401).send("email address is not correct");

  if (
    password.length > 5 &&
    /\d/.test(password) &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)
  )
    userModel
      .find({})
      .then(async (result) => {
        const found = result.find((item) => {
          return item.username == username.trim();
        });
        if (found) res.status(400).send("the username is exist");

        const found2 = result.find((item) => {
          return item.email == savedEmail;
        });
        if (found2) res.status(400).send("the email is exist");

        if (found) res.status(400).send("the username or email are exist");
        else {
          const passwordHashed = await bcrypt.hash(password, SALT);

          const newUser = new userModel({
            email: savedEmail,
            username: username,
            password: passwordHashed,
            avter: avter,
            role,
          });

          newUser
            .save()
            .then(async (result) => {
              //console.log(result._id);
              const message = `http://localhost:4000/user/verify/${result._id}`;
              console.log(message);
              await sendEmail(result.email, "Verify Email", message);
              res.status(201).json(result);
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  else {
    console.log(password);
    res.status(400).send("the password is not complex");
  }
};

const verify = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id });

    if (!user) return res.status(400).send("Invalid link");

    await userModel.updateOne({ _id: user._id }, { verified: true });

    res.send("email verified sucessfully");
  } catch (error) {
    res.status(400).send("An error occured");
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    const link = `${process.env.BASE_URL}/user/completeResetPassword/${user._id}`;
    await sendEmail(user.email, "Password reset", link);

    res.send("password reset link sent to your email account");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};
const completeResetPassword = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(400).send("invalid link or expired");

    user.password = req.body.password;
    await user.save();
    //await token.delete();

    res.send("password reset sucessfully.");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};

const login = (req, res) => {
  const { usernameOrEmail, password } = req.body;
  //console.log(usernameOrEmail + " " + password);

  userModel
    .find({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] })
    .then(async (result) => {
      if (result) {
        if (
          usernameOrEmail === result[0].email ||
          usernameOrEmail === result[0].username
        ) {
          const hashedPass = await bcrypt.compare(password, result[0].password);

          if (hashedPass) {
            const payload = {
              role: result[0].role,
              userId: result[0]._id,
            };
            const options = {
              expiresIn: "60m",
            };

            const token = await jwt.sign(payload, secretKey, options);

            res.status(200).json({ result, token });
          } else {
            res.status(400).json("email or password is not correct");
          }
        } else {
          res.status(400).json("email or password is not correct");
        }
      } else {
        res.status(400).json("email not found");
      }
    })
    .catch((err) => {
      res.status(400).json("email or password is not correct");
    });
};

//for admin

const getUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const delUser = async (req, res) => {
  const { username } = req.body;

  let doc = await userModel.updateOne({ username: username }, { isDel: true });
  res.status(200).json(doc);
};

module.exports = {
  register,
  verify,
  login,
  getUsers,
  delUser,
  resetPassword,
  completeResetPassword,
};

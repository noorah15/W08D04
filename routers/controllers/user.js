const userModel = require("./../../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
            .then((result) => {
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

module.exports = { register, login, getUsers, delUser };

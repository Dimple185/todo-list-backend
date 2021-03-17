const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).then((error, user) => {
    if (user) {
      return res.status(400).json({
        message: "User already registered!",
      });
    }

    const { userName, password, email } = req.body;
    const newUser = new User({
      userName,
      password,
      email,
    });

    newUser.save((error, data) => {
      console.log("data", data);
      if (error) {
        return res.status(400).json({
          message: "Something went Wrong!",
        });
      }

      if (data) {
        return res.status(200).json({
          message: "User added successfully!",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
         console.log(res.data);
        if (user.authenticate(req.body.password)) {
          const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET ||
              require("crypto").randomBytes(30).toString("hex"),
            {
              expiresIn: "1h",
            }
          );

          const { userName, password, email } = user;
          res.status(200).json({
            token,
            user: {
              userName,
              password,
              email,
            },
          });
        } else {
          return res.status(400).json({
            message: "Invalid Password",
          });
        }
      } else {
        return res.status(400).json({
          message: "Something went Wrong!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(
    token,
    process.env.JWT_SECRET || require("crypto").randomBytes(30).toString("hex")
  );
  req.user = user;
  next();
};

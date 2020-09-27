const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin");

router.post("/signup", async (req, res) => {
  const { name, password, email } = req.body;

  if (!email || !password || !name) {
    res.status(422).json({ error: "Please fill up the all the fields" });
  }
  await User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      res.status(422).json({ error: "User already exists with that email" });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          email,
          password: hashedPassword,
          name,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(arr);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "please add email or password" });
  }
  await User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or Password" });
    }
    bcrypt.compare(password, savedUser.password).then((doMatch) => {
      if (doMatch) {
        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
        const { _id, name, email, profile_pic } = savedUser;
        res.json({
          token,
          user: { _id, name, email, profile_pic },
        });
      } else {
        return res.status(422).json({ error: "Invalid Email or Password" });
      }
    });
  });
});
module.exports = router;

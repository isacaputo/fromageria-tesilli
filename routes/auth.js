const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const models = require("../models");

const supersecret = process.env.SUPER_SECRET;

// Registration part: set username and password for the user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  //hash password with a few salt rounds converts password into unreadable string
  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const auth = await models.Auth.create({
      username,
      password: hash,
    });

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Authentication part: receive a token back if the password is correct
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await models.Auth.findOne({
      where: {
        username,
      },
    });
    if (user) {
      const user_id = user.id;
      if (!user.password) throw new Error("There is no password");

      const correctPassword = await bcrypt.compare(password, user.password);
      // the compare method will return a boolean (either the password match or doesn't)

      const token = jwt.sign({ user_id }, supersecret);
      // the sign method needs two things to work: payload and a supersecret (stored in the backend)

      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Authorization part: check if the user is logged in with the middleware function userShouldBeLoggedIn
router.get("/adminview", userShouldBeLoggedIn, async (req, res) => {
  res.send({ message: "Welcome, Admin!" });
});

module.exports = router;

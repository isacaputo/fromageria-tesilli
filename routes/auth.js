var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
// var db = require("../model/helper");
require("dotenv").config();
var bcrypt = require("bcrypt");
const saltRounds = 10;
const models = require("../models");

const supersecret = process.env.SUPER_SECRET;

//set username and password
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

//receive a token back if the password is correct
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("password", password);

  try {
    const user = await models.Auth.findOne({
      where: {
        username,
      },
    });
    if (user) {
      const user_id = user.id;
      if (!user.password) throw new Error("Invalid password");

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id }, supersecret);
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/adminview", userShouldBeLoggedIn, async (req, res) => {
  res.send({ message: "Welcome, Admin." });
});

module.exports = router;

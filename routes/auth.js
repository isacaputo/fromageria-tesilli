const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn');
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const models = require('../models');

const supersecret = process.env.SUPER_SECRET;

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const auth = await models.Auth.create({
      username,
      password: hash,
    });

    res.send({ message: 'Register successful' });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await models.Auth.findOne({
      where: {
        username,
      },
    });
    if (user) {
      const user_id = user.id;
      if (!user.password) throw new Error('There is no password');

      const correctPassword = await bcrypt.compare(password, user.password);

      const token = jwt.sign({ user_id }, supersecret);

      res.send({ message: 'Login successful, here is your token', token });
    } else {
      throw new Error('User does not exist');
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/adminview', userShouldBeLoggedIn, async (req, res) => {
  res.send({ message: 'Welcome, Admin!' });
});

module.exports = router;

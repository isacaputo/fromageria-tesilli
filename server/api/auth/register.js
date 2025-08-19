const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../../../models');

const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'POST') {
      const { username, password } = req.body;

      const hash = await bcrypt.hash(password, saltRounds);

      const auth = await models.Auth.create({
        username,
        password: hash,
      });

      res.status(201).json({ message: 'Register successful' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ message: error.message });
  }
};

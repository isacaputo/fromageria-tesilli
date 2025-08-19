const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { initDatabase, checkDatabaseConnection } = require('../utils/database');

const supersecret = process.env.SUPER_SECRET;

module.exports = async (req, res) => {
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
    checkDatabaseConnection();
    const { models } = initDatabase();

    if (req.method === 'POST') {
      const { username, password } = req.body;

      const user = await models.Auth.findOne({
        where: { username },
      });

      if (user) {
        const user_id = user.id;
        if (!user.password) throw new Error('There is no password');

        const correctPassword = await bcrypt.compare(password, user.password);

        if (correctPassword) {
          const token = jwt.sign({ user_id }, supersecret);
          res.status(200).json({
            message: 'Login successful, here is your token',
            token,
          });
        } else {
          throw new Error('Incorrect password');
        }
      } else {
        throw new Error('User does not exist');
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ message: error.message });
  }
};

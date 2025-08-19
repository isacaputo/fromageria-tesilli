require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createPool(process.env.DATABASE_URL);

connection.getConnection((err, conn) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to Railway MySQL!');
    conn.release();
  }
});

module.exports = connection.promise();

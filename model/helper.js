const db = require('./database');

module.exports = async function queryDB(sql) {
  try {
    const [rows] = await db.query(sql);
    return { data: rows, error: null };
  } catch (err) {
    console.error('DB Error:', err);
    return { data: [], error: err };
  }
};

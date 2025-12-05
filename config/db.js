const mysql = require("mysql2");
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

// TEST CONNECTION
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err.message);
  } else {
    console.log("✅ MySQL Connected Successfully!");
    connection.release();
  }
});

module.exports = pool;

require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000,
});

// Optional: Test connection
pool.getConnection(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL Connected Successfully!");
    conn.release();
  } catch (err) {
    console.error("❌ MySQL Connection Error:", err.message);
  }
});

module.exports = pool;

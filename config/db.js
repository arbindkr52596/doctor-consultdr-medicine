const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    port: 3306,  // IMPORTANT
    connectTimeout: 20000, // 20 sec for Render
    ssl: { rejectUnauthorized: false } // shared hosting ke liye zaroori
});

db.connect((error) => {
    if (error) {
        console.log("❌ Database connection error:", error.message);
    } else {
        console.log("✅ Database connected successfully");
    }
});

module.exports = db;

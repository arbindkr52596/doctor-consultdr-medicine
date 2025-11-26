const mysql = require("mysql2");
const db = mysql.createConnection({
    host: process.env.MYSQLHOST || "localhost",
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "",
    database: process.env.MYSQLDATABASE || "pharmacy",
    port: process.env.MYSQLPORT || 3306
});

db.connect((error)=>{
    if(error){
        console.log(" Database connection error:", error);
    } else {
        console.log(" Database connected");
    }
});

module.exports = db;

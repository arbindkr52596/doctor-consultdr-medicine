const mysql = require("mysql2");
const db = mysql.createConnection({
    host: process.env.DBHOST || "localhost",
    user: process.env.DBUSER || "root",
    password: process.env.DBPASSWORD || "",
    database: process.env.DBNAME || "pharmacy",
});

db.connect((error)=>{
    if(error){
        console.log(" Database connection error:", error.message);
    } else {
        console.log(" Database connected");
    }
});

module.exports = db;

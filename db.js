const mysql = require("mysql2");
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"pharmacy"
});
db.connect((error)=>{
if(error){
    console.log("database connection error"+error)
}else{
    console.log("database connected")
}
})
module.exports=db;
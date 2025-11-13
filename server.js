const express = require("express");
const app = express();
const db = require("./db");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/medicine",(request,response)=>{
    const sqlQuery = "SELECT * FROM medicines";
    db.query(sqlQuery,(err,result)=>{
        if(err){
         return response.status(500).json({message:"Error fetching medicines",error:err});
            
        }
        response.json(result);
    });
});

app.get("/medicine/:id", (req, res) => {
    const query = "SELECT * FROM medicines WHERE id = ?";
    const id = req.params.id;

    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error fetching medicine", error: err });
            return;
        }

        if (results.length === 0) {
         return   res.status(404).json({ message: "Medicine not found" });
          
        }
        res.json(results[0])

       
    });
});


app.listen(4000,()=>{
    console.log("server is running")
})
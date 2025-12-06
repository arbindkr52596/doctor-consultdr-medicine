const express = require("express");
const db = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

const medicineRoutes = require("./route/medicineRoute");

app.use("/medicine", medicineRoutes);
app.use("/consultDr", require("./route/consultDr"));
app.use("/doctors", require("./route/doctors"));

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});

const express = require("express");
const router = express.Router();

const {
  getAllMedicine,
  getSearchMedicine,
  addMedicine,
  updateMedicine,
  deleteMedicine
} = require("../controller/medicineController");

router.get("/getAllMedicine", getAllMedicine);
router.get("//:id", getSearchMedicine);
router.post("/addMedicine", addMedicine);
router.put("/getMedicineupdateMedicine/:id", updateMedicine);
router.delete("/deleteMedicine/:id", deleteMedicine);

module.exports = router;

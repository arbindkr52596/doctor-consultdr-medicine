const express=require("express");
const db=require("../config/db");

// GET All MEDICINE
exports.getAllMedicine=async (request, response) => {
    const sqlQuery = "SELECT * FROM medicines";
    db.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(500).json({ message: "Error fetching medicines", error: err.message });

        }
        response.json(result);
    });
}

// GET SEARCH BY ID
exports.getSearchMedicine = async (req, res) => {
const query = "SELECT * FROM medicines WHERE med_id = ?";
    const id = req.params.id;

    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error fetching medicine", error: err.message });
            return;
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Medicine not found" });

        }
        res.json(results[0])

    });
}

// ADD NEW MEDICINE (POST)
exports.addMedicine = async (req, res) => {
  const d = req.body;

  const query = `
    INSERT INTO medicines 
    (med_name, med_image, med_brand_name, med_price, med_rating, med_type,
     med_pack_size, med_return_policy, med_description, med_discount_percentage,
     med_information_manufacture, med_know_more)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      d.med_name,d.med_image,d.med_brand_name,
      d.med_price,
      d.med_rating,
      d.med_type,
      d.med_pack_size,
      d.med_return_policy,
      d.med_description,
      d.med_discount_percentage,
      d.med_information_manufacture,
      d.med_know_more
    ],
    (err, result) => {
      if (err) return res.json({ message: "Error inserting", error: err });
      res.json({ message: "Inserted Successfully", id: result.insertId });
    }
  );
}

// UPDATE MEDICINE
exports.updateMedicine = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const query = `
    UPDATE medicines SET
    med_name = ?, med_image = ?, med_brand_name = ?, med_price = ?, med_rating = ?, 
    med_type = ?, med_pack_size = ?, med_return_policy = ?, med_description = ?, 
    med_discount_percentage = ?, med_information_manufacture = ?, med_know_more = ?
    WHERE med_id = ?
  `;

  db.query(
    query,
    [
      data.med_name,
      data.med_image,
      data.med_brand_name,
      data.med_price,
      data.med_rating,
      data.med_type,
      data.med_pack_size,
      data.med_return_policy,
      data.med_description,
      data.med_discount_percentage,
      data.med_information_manufacture,
      data.med_know_more,
      id
    ],
    (err) => {
      if (err) return res.json({ message: "Error updating medicine", error: err });
      res.json({ message: "Medicine Updated Successfully" });
    }
  );
}

// DELETE MEDICINE
exports.deleteMedicine = async (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM medicines WHERE med_id = ?", [id], (err) => {
    if (err) return res.json({ message: "Error deleting medicine", error: err });
    res.json({ message: "Medicine Deleted Successfully" });
  });
}
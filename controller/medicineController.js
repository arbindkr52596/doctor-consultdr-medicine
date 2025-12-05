const db = require("../config/db");

// GET ALL MEDICINES
exports.getAllMedicine = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM medicines");
    res.json(rows);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching medicines",
      error: err.message
    });
  }
};


// GET SEARCH BY ID
exports.getSearchMedicine = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM medicines WHERE med_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.json(rows[0]);

  } catch (err) {
    res.status(500).json({
      message: "Error fetching medicine",
      error: err.message
    });
  }
};

// ADD MEDICINE
exports.addMedicine = async (req, res) => {
  try {
    const d = req.body;

    const query = `
      INSERT INTO medicines 
      (med_name, med_image, med_brand_name, med_price, med_rating, med_type,
       med_pack_size, med_return_policy, med_description, med_discount_percentage,
       med_information_manufacture, med_know_more)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
      d.med_name, d.med_image, d.med_brand_name, d.med_price, d.med_rating,
      d.med_type, d.med_pack_size, d.med_return_policy, d.med_description,
      d.med_discount_percentage, d.med_information_manufacture, d.med_know_more
    ]);

    res.json({ message: "Inserted Successfully", id: result.insertId });

  } catch (err) {
    res.status(500).json({
      message: "Error inserting medicine",
      error: err.message
    });
  }
};

// UPDATE MEDICINE
exports.updateMedicine = async (req, res) => {
  try {
    const id = req.params.id;
    const d = req.body;

    const query = `
      UPDATE medicines SET
      med_name = ?, med_image = ?, med_brand_name = ?, med_price = ?, med_rating = ?, 
      med_type = ?, med_pack_size = ?, med_return_policy = ?, med_description = ?, 
      med_discount_percentage = ?, med_information_manufacture = ?, med_know_more = ?
      WHERE med_id = ?
    `;

    await db.query(query, [
      d.med_name, d.med_image, d.med_brand_name, d.med_price, d.med_rating,
      d.med_type, d.med_pack_size, d.med_return_policy, d.med_description,
      d.med_discount_percentage, d.med_information_manufacture, d.med_know_more,
      id
    ]);

    res.json({ message: "Medicine Updated Successfully" });

  } catch (err) {
    res.status(500).json({
      message: "Error updating medicine",
      error: err.message
    });
  }
};

// DELETE MEDICINE
exports.deleteMedicine = async (req, res) => {
  try {
    await db.query("DELETE FROM medicines WHERE med_id = ?", [
      req.params.id
    ]);

    res.json({ message: "Medicine Deleted Successfully" });

  } catch (err) {
    res.status(500).json({
      message: "Error deleting medicine",
      error: err.message
    });
  }
};

const db = require("../config/db");

// Get all consult doctors
exports.consultAllDoctor = (req, res) => {
    const sql = "SELECT * FROM consult_doctors";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

// Get consult doctor by id
exports.consultDoctor = (req, res) => {
    const sql = "SELECT * FROM consult_doctors WHERE dr_id = ?";
    db.query(sql, [req.params.dr_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Not found" });
        res.json(result[0]);
    });
};

// Add profile doctor
exports.addProfileDoctor = async (req, res) => {
    const {
        dr_id, dr_name, dr_image, dr_experience, dr_specialiaze, dr_timing, rating, total_consult, doctor_hospital_name, consultation_fees, dr_qualification
    } = req.body;

    const query = `
      INSERT INTO consult_doctors 
      (dr_id, dr_name, dr_image, dr_experience,dr_specialiaze,dr_timing, rating, total_consult, doctor_hospital_name, consultation_fees, dr_qualification)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [
        dr_id, dr_name, dr_image, dr_experience, dr_specialiaze, dr_timing, rating, total_consult, doctor_hospital_name, consultation_fees, dr_qualification

    ], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error adding profile", error: err });
        }
        res.json({ message: "Doctor profile added successfully", doctor_id: dr_id });
    });
}

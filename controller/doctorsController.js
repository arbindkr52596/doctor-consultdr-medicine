const express=require("express");
const db=require("../config/db");

//GET ALL DOCTORS 
exports.getAllDoctor=async(request, response) => {
    const sqlQuery = "SELECT * FROM doctors";
    db.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(500).json({ message: "Error fetching doctor", error: err });
        }
        return response.json(result);
    });
}
//SEARCH DOCTOR (GET by ID)
exports.searchDoctor=async (req, res) => {
    const query = "SELECT * FROM doctors WHERE dr_id = ?";
    const id = req.params.id;

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching doctors", error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json(results[0]);
    });
}
// ADD NEW DOCTOR (POST)
exports.addDoctor=async(req, res) => {
    const {
        dr_id,dr_name,dr_image,dr_experience,dr_speciality,patient_review,rating,liked_people,doctor_location,consultation_fees,doctor_timing,dr_qualification, dr_about
    } = req.body;

    const query = `
      INSERT INTO doctors 
      (dr_id, dr_name, dr_image, dr_experience, dr_speciality, patient_review, rating, liked_people, doctor_location, consultation_fees, doctor_timing, dr_qualification, dr_about)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [
        dr_id, dr_name, dr_image, dr_experience, dr_speciality, patient_review, rating,
        liked_people, doctor_location, consultation_fees, doctor_timing, dr_qualification, dr_about
    ], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error adding doctor", error: err });
        }
        res.json({ message: "Doctor added successfully", doctor_id: dr_id });
    });
}

//updateDoctor
exports.updateDoctor=async  (req, res) => {
    const id = req.params.id;

    const query = `
      UPDATE doctors SET 
      dr_name=?, dr_image=?, dr_experience=?, dr_speciality=?, patient_review=?, rating=?,
      liked_people=?, doctor_location=?, consultation_fees=?, doctor_timing=?, dr_qualification=?, dr_about=?
      WHERE dr_id=?
    `;

    const {
        dr_name,dr_image,dr_experience,dr_speciality,patient_review,rating,liked_people,doctor_location,consultation_fees,
        doctor_timing,dr_qualification,dr_about
          } = req.body;

    db.query(query, [
        dr_name, dr_image, dr_experience, dr_speciality, patient_review, rating,
        liked_people, doctor_location, consultation_fees, doctor_timing, dr_qualification, dr_about, id
    ], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error updating doctor", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json({ message: "Doctor updated successfully" });
    });
}

//deleteDoctor
exports.deleteDoctor=async (req, res) => {
    const id = req.params.id;

    const query = "DELETE FROM doctors WHERE dr_id = ?";

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error deleting doctor", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json({ message: "Doctor deleted successfully" });
    });
}
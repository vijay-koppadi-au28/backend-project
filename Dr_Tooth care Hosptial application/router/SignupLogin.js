const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const patientModel = require("../models/patientsModel");

const res = require("express/lib/response");

router.post("/signupLogin", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  patient = {
    username: req.body.username,
    email: req.body.email,
    mobile_number: req.body.mobile_number,
    password: hashPassword,
  };
  const data = await patientModel.create(patient);
  res.render("signupLogin");
});

module.exports = router;

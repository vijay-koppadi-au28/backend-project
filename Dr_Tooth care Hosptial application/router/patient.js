const express = require("express");
const router = express.Router();
const sessionStorage = require("sessionstorage-for-nodejs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");
const bodyParser = require("body-parser");
const appointmentModel = require("../models/appointmentModel");
const patientModel = require("../models/patientsModel");

const secret = "yegriyewjfvsjfcusvcksbciwbicukj";

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var username2 = "";

const auth = (req, res, next) => {
  const sessionToken = sessionStorage.getItem("sessionToken");

  if (sessionToken) {
    jwt.verify(sessionToken, secret, (err, patient) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.patient = patient;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.get("/user", auth, async (req, res) => {
  const users = await appointmentModel.findOne({ username: username2 });
  const patients = await patientModel.findOne({ username: username2 });
  res.render("users", {
    user: {
      username: users.username,
      name: users.name,
      email: patients.email,
      mobile: patients.mobile_number,
      date: users.date,
    },
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const sessionStorage = require("sessionstorage-for-nodejs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const patientModel = require("../models/patientsModel");
const { route } = require("./login");

const secret = "yegriyewjfvsjfcusvcksbciwbicukj";

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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

router.get("/appointment", auth, (req, res) => {
  res.render("appointment");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sessionStorage = require("sessionstorage-for-nodejs");
const res = require("express/lib/response");
const patientModel = require("../models/patientsModel");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

drUserName = "admin";
drpassword = "admin123";
var username1 = "";
var username2 = "";
const secret = "yegriyewjfvsjfcusvcksbciwbicukj";

router.post("/dashboard", async (req, res) => {
  username2 = "";

  username1 = username1 + req.body.username;
  username2 = username2 + req.body.username;

  const dentalPatient = await patientModel.findOne({
    username: req.body.username,
  });

  if (!dentalPatient) {
    res.send("Incorrect Username or Password");
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    dentalPatient.password
  );
  if (!validPassword) {
    res.send("Incorrect Username or Password");
  }

  if (dentalPatient && validPassword) {
    const tokenGenerated = jwt.sign(
      { username: dentalPatient.username },
      secret
    );
    sessionStorage.setItem("sessionToken", tokenGenerated);
    res.render("home.ejs");
  }
});

module.exports = router;

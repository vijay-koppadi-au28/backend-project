const express = require("express");
const router = express.Router();
const sessionStorage = require("sessionstorage-for-nodejs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");
const secret = "yegriyewjfvsjfcusvcksbciwbicukj";

const app = express();

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

router.get("/services", auth, (req, res) => {
  res.render("ourServices");
});

module.exports = router;

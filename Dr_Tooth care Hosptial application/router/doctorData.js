const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var XLSX = require("xlsx");
const bcrypt = require("bcryptjs");
const appointmentModel = require("../models/appointmentModel");

doctorUserName = "admin";
doctorPassword = "admin123";

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/doctorsData", (req, res) => {
  res.render("doctorslogin");
});

router.post("/doctorslogin", (req, res) => {
  if (
    doctorUserName == req.body.username &&
    doctorPassword == req.body.password
  ) {
    var wb = XLSX.utils.book_new(); //new workbook
    appointmentModel.find((err, data) => {
      if (err) {
        console.log(err);
      } else {
        var temp = JSON.stringify(data);
        temp = JSON.parse(temp);
        var ws = XLSX.utils.json_to_sheet(temp);
        var down = __dirname + "/database/exportdata.xlsx";
        XLSX.utils.book_append_sheet(wb, ws, "sheet1");
        XLSX.writeFile(wb, down);
        res.download(down);
      }
    });
  } else {
    res.send("Incorrect Username or Password");
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const sessionStorage = require("sessionstorage-for-nodejs");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const nodemailer = require("nodemailer");
// const res = require("express/lib/response");
// const bodyParser = require("body-parser");
// const appointmentModel = require("../models/appointmentModel");

// const secret = "dvkydhdiad465121@#$%cffkubjvh";

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

// var username1 = "";

// const auth = (req, res, next) => {
//   const sessionToken = sessionStorage.getItem("sessionToken");

//   if (sessionToken) {
//     jwt.verify(sessionToken, secret, (err, patient) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       req.patient = patient;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

// router.post("/booked", auth, async (req, res) => {
//   const oldAppointee = await appointmentModel.findOne({ username: username1 });
//   if (oldAppointee) {
//     await appointmentModel.findOneAndUpdate(
//       { username: username1 },
//       { $push: { date: req.body.date } }
//     );

//     new_date = req.body.date;
//     new_name = req.body.name;
//     mail = new_name + " has booked his/her slot on " + new_date + ".";
//     let transporter = nodemailer.createTransport({
//       host: "smtp-mail.outlook.com",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: "vj.k5486@outlook.com", // outlook mail id
//         pass: "Vj9014547698", // outlook mail od password
//       },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: "vj.k5486@gmail.com", // sender emailid
//       to: "vj.k5486@gmail.com", // reciver email id
//       subject: "Dr. Tooth", // Subject line
//       text: mail, // plain text body
//     });

//     console.log("Message sent: %s", info.messageId);

//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

//     username1 = "";
//     res.render("book");
//   } else {
//     appointment = {
//       username: username1,
//       name: req.body.name,
//       date: req.body.date,
//     };
//     const data = await appointmentModel.create(appointment);
//     new_date = req.body.date;
//     new_name = req.body.name;
//     mail = new_name + " has booked his/her slot on " + new_date + ".";
//     let transporter = nodemailer.createTransport({
//       host: "smtp-mail.outlook.com",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: "vj.k5486@outlook.com",
//         pass: "Vj9014547698",
//       },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: "vj.k5486@outlook.com", // sender address
//       to: "vj.k5486@gmail.com", // list of receivers
//       subject: "Dr. Tooth", // Subject line
//       text: mail, // plain text body
//     });

//     console.log("Message sent: %s", info.messageId);

//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

//     username1 = "";
//     res.render("book");
//   }
// });

// module.exports = router;

const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var XLSX = require("xlsx");
const nodemailer = require("nodemailer");
const patientModel = require("./models/patientsModel");
const appointmentModel = require("./models/appointmentModel");
const bodyParser = require("body-parser");
const sessionStorage = require("sessionstorage-for-nodejs");

const connectDB = require("./database/db");
const loginrout = require("./router/login");
const signuprout = require("./router/signup");
const appointmentRout = require("./router/appointment");
const signupLoginRout = require("./router/SignupLogin");
const ServicesRout = require("./router/services");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
drUserName = "admin";
drpassword = "admin123";
var username1 = "";
var username2 = "";
const secret = "yegriyewjfvsjfcusvcksbciwbicukj";

app.engine("ejs", engine({ defaultLayout: "main", extname: ".ejs" }));
app.set("view engine", "ejs");

connectDB();

app.use("/", loginrout);
app.use("/", appointmentRout);
app.use("/", signuprout);
app.use("/", signupLoginRout);
app.use("/", ServicesRout);

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

app.post("/dashboard", async (req, res) => {
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
app.post("/booked", auth, async (req, res) => {
  const oldAppointee = await appointmentModel.findOne({ username: username1 });
  if (oldAppointee) {
    await appointmentModel.findOneAndUpdate(
      { username: username1 },
      { $push: { date: req.body.date } }
    );

    new_date = req.body.date;
    new_name = req.body.name;
    mail =
      new_name +
      " Remainder: has booked his/her slot is comformed on " +
      new_date +
      ".";
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "vj.k5486@gmail.com",
        pass: "", //password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "vj.k5486@gmail.com", // sender emailid
      to: "vj.k5486@gmail.com", // reciver email id
      subject: "Dr. Tooth", // Subject line
      text: mail, // plain text body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    username1 = "";
    res.render("ConformedApp");
  } else {
    appointment = {
      username: username1,
      name: req.body.name,
      date: req.body.date,
    };
    const data = await appointmentModel.create(appointment);
    new_date = req.body.date;
    new_name = req.body.name;
    mail =
      new_name +
      " has booked his/her slot on booked succuessfuly on  " +
      new_date +
      ".";
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "vj.k5486@outlook.com",
        pass: "", //password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "vj.k5486@outlook.com", // sender address
      to: "vj.k5486@gmail.com", // list of receivers
      subject: "Dr. Tooth Care hosiptal appointment conformation", // Subject line
      text: mail, // plain text body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    username1 = "";
    res.render("ConformedApp");
  }
});

app.get("/doctorlogin", (req, res) => {
  res.render("doctorlogin");
});

app.post("/doctorlogin", (req, res) => {
  if (drUserName == req.body.username && drpassword == req.body.password) {
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

app.get("/user", auth, async (req, res) => {
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
const port = process.env.Port || 3000;
app.listen(port, () => {
  console.log(`Dr Tooth Care app Server is running on port ${port}`);
});

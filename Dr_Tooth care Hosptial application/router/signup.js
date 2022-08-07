const express = require("express");
const router = express.Router();
const res = require("express/lib/response");

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;

// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const express = require("express");

const router = express.Router();
// Routes
// =============================================================


// Each of the below routes just handles the HTML page that the user gets sent to.

// index route loads view.html
router.get("/", function (req, res) {
  // res.sendFile(path.join(__dirname, "../public/chat.html"));
  res.render("index", {});
});

// // cms route loads cms.html
// app.get("/cms", function (req, res) {
//   res.sendFile(path.join(__dirname, "../public/cms.html"));
// });

// blog route loads chat.html
router.get("/chat", function (req, res) {
  // res.sendFile(path.join(__dirname, "../public/chat.html"));
  res.render("index", {});
});

// authors route loads user-manager.html
router.get("/users", function (req, res) {
  // res.sendFile(path.join(__dirname, "../public/user-manager.html"));
  res.render("index", {});
});



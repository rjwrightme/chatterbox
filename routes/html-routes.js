// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const express = require("express");

const router = express.Router();

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================


// Each of the below routes just handles the HTML page that the user gets sent to.

// index route loads index.html
router.get("/", function (req, res) {
  console.log("homepage requested: " + req);
  res.render("index", {});
});

// signup page
router.get("/signup", function (req, res) {
  console.log("signup requested: " + req);
  res.render("signup", {});
});

// signup page
router.get("/login", function (req, res) {
  console.log("login requested: " + req);
  res.render("login", {});
});

// // cms route loads cms.html
// app.get("/cms", function (req, res) {
//   res.sendFile(path.join(__dirname, "../public/cms.html"));
// });

// blog route loads chat.html
router.get("/chat", function (req, res) {
  // res.sendFile(path.join(__dirname, "../public/chat.html"));
  res.render("public_chat", {});
});

// authors route loads user-manager.html
router.get("/users", isAuthenticated, function (req, res) {
  // res.sendFile(path.join(__dirname, "../public/user-manager.html"));
  const userData = {
    name: req.user.name,
    email: req.user.email,
    createdAt: req.user.createdAt,
    id: req.user.id,
  };
  res.render("public_chat", userData);
});

module.exports = router;

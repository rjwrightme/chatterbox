// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const express = require("express");

const router = express.Router();

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================

// Each of the below routes just handles the HTML page that the user gets sent to.

// index route loads view.html
router.get("/", function (req, res) {
  console.log("homepage requested: " + req);
  res.render("index", {});
});

// signup page
router.get("/signup", function (req, res) {
  console.log("signup requested: " + req);
  res.render("signup", {});
});

// login page
router.get("/login", function (req, res) {
  console.log("login requested: " + req);
  res.render("login", {});
});

// Here we've added our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/chat", isAuthenticated, function (req, res) {
  res.render("chat", {});
});

// load account page
router.get("/account", isAuthenticated, function (req, res) {
  res.render("account", {});
});

//user dashboard page
router.get("/users", function (req, res) {
  res.render("users", {});
});

module.exports = router;

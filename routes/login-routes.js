// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const express = require("express");
const loginRouter = express.Router();

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
loginRouter.post(
  "/api/login",
  passport.authenticate("local"),
  function (req, res) {
    res.json(req.user);
  }
);

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
loginRouter.post("/api/signup", function (req, res) {
  console.log(req.body);
  db.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
    .then(function () {
      res.redirect(307, "/api/login");
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

// Route for logging user out
loginRouter.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = loginRouter;

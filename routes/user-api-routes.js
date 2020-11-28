var db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/api/users", function (req, res) {
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Chat
  db.User.findAll({
    include: [db.Chat],
  }).then(function (dbUser) {
    res.json(dbUser);
  });
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", (req, res) => {
  console.log("/api/user_data route hit!");
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    console.log("We have a user! " + req.user);
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      createdAt: req.user.createdAt,
    });
  }
});

router.post("/api/users", function (req, res) {
  db.User.create(req.body).then(function (dbUser) {
    res.json(dbUser);
  });
});

router.delete("/api/users/:id", function (req, res) {
  db.User.destroy({
    where: {
      id: req.params.id,
    },
  }).then(function (dbUser) {
    res.json(dbUser);
  });
});

module.exports = router;

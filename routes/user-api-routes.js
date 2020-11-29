var db = require("../models");
const express = require("express");
const userRouter = express.Router();

userRouter.get("/api/users", function (req, res) {
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
userRouter.get("/api/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      createdAt: req.user.createdAt,
      isOnline: req.user.isonline,
      avatar: req.user.avatar,
    });
  }
});

userRouter.post("/api/users", function (req, res) {
  db.User.create(req.body).then(function (dbUser) {
    res.json(dbUser);
  });
});

// PUT route for updating posts
userRouter.put("/api/users", function (req, res) {
  db.User.update(req.body, {
    where: {
      id: req.body.id,
    },
  }).then(function (dbChat) {
    res.json(dbChat);
  });
});

userRouter.delete("/api/users/:id", function (req, res) {
  db.User.destroy({
    where: {
      id: req.params.id,
    },
  }).then(function (dbUser) {
    res.json(dbUser);
  });
});

module.exports = userRouter;

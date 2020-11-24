// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the posts
  app.get("/api/chats", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User

    // *** UPDATE TO INCLUDE LIMIT OF 20 CHATS ***
    db.Chat.findAll({
      where: query,
      include: [db.User]
    }).then(function (dbChat) {
      res.json(dbChat);
    });
  });

  // Get route for retrieving a single post
  // app.get("/api/chats/:id", function (req, res) {
  //   // Here we add an "include" property to our options in our findOne query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.Author
  //   db.Chat.findOne({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.User]
  //   }).then(function (dbChat) {
  //     res.json(dbChat);
  //   });
  // });

  // POST route for saving a new post
  app.post("/api/chats", function (req, res) {
    db.Chat.create(req.body).then(function (dbChat) {
      res.json(dbChat);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/chats/:id", function (req, res) {
    db.Chat.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbChat) {
      res.json(dbChat);
    });
  });

  // PUT route for updating posts
  app.put("/api/chats", function (req, res) {
    db.Chat.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbChat) {
      res.json(dbChat);
    });
  });

};

const app = require("express");

const chat = require("../models/chat");


module.exports = function (app) {

  app.get("/", (req, res) => {

    res.render("index", { title: "Express" });

  });

  app.get("/chat", (req, res) => {

    var username = req.query.username;
    var messages = req.query.messages;
    console.log(username, "is logging in")
    var hbsObject = {
      username: username,
      messages: messages,
    };
    res.render("public_chat", hbsObject);
  });


};

/* eslint-disable indent */
var express = require("express");
var app = require("express")();
// var path = require("path");
var http = require("http");
// var io = require("socket.io")(http);
var port = process.env.PORT || 3600;


// const PORTSOCKET = process.env.PORT || 8080;
var server = http.createServer(app);
var io = require("socket.io")(server);
// db.sequelize.sync().then(() => {

// })

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/index.html");
// });


app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function (req, res) {

    res.render("index", { title: "Express" });

});



var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



io.on("connection", function (socket) {
    socket.on("chat message", function (msg) {
        io.emit("chat message", msg);
    });
});


server.listen(port, function () {
    console.log("listen to" + port);
});
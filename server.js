var express = require("express");
var app = require("express")();
var http = require("http");
var port = process.env.PORT || 3600;


var server = http.createServer(app);
var io = require("socket.io")(server);

app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


require("./controllers/chat_controller.js")(app);



io.on("connection", (socket) => {
  console.log("a new user connected")
  socket.on('public_chat', () => {
    socket.emit('message', "welcome new user");
  })
});


server.listen(port, function () {
  console.log("listen to" + port);
});
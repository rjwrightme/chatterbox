var express = require("express");
var app = require("express")();
var http = require("http");
var port = process.env.PORT || 3600;


var server = http.createServer(app);
var io = require("socket.io")(server);

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


require("./controllers/chat_controller.js")(app);

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/chat-api-routes.js")(app);
require("./routes/login-routes.js")(app);
require("./routes/user-api-routes.js")(app);


io.on("connection", (socket) => {
  console.log("a new user connected")
  socket.on('public_chat', () => {
    socket.emit('message', "welcome new user");
  })
});


server.listen(port, function () {
  console.log("listen to" + port);
});

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in our browser.", PORT, PORT);
  });
});
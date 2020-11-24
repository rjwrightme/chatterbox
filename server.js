const express = require("express");
const app = require("express")();
const http = require("http");
const PORT = process.env.PORT || 3600;
const session = require("express-session");
const passport = require("./config/passport");
const db = require("./models");

const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const server = http.createServer(app);
const io = require("socket.io")(server);

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var chatterbox = "Chatterbox";

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


require("./controllers/chat_controller.js")(app);

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/chat-api-routes.js")(app);
require("./routes/login-routes.js")(app);
require("./routes/user-api-routes.js")(app);

// Run when client connects
io.on("connection", socket => {
  console.log("NEW CONNECTION");
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(chatterbox, "Welcome to Chatterbox!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(chatterbox, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)

    // Listen for chatMessage
    socket.on("chatMessage", msg => {
      const user = getCurrentUser(socket.id);

      io.to(user.room).emit('message', formatMessage(user.username, msg));

    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(chatterbox, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

// server.listen(PORT, function () {
//   console.log("listen to" + PORT);
// });

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in our browser.", PORT, PORT);
  });
});
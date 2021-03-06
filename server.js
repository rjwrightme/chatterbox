/* eslint-disable camelcase */
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const PORT = process.env.PORT || 8080;
const session = require("express-session");
const passport = require("./config/passport");
const db = require("./models");
const bodyParser = require("body-parser");

const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const server = http.createServer(app);
const io = require("socket.io")(server);

// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
const htmlRouter = require("./routes/html-routes.js");
const loginRouter = require("./routes/login-routes.js");
const userRouter = require("./routes/user-api-routes.js");
// require("./routes/chat-api-routes.js")(app);
// require("./routes/user-api-routes.js")(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use our routes
app.use(htmlRouter);
app.use(loginRouter);
app.use(userRouter);

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

var chatterbox = "Chatterbox";

var exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

// eslint-disable-next-line camelcase
get_current_time = function () {
  var chat_date = new Date();
  var hour = chat_date.getHours();
  var mins = chat_date.getMinutes();
  var time_chat = hour + ":" + mins + " ";
  return time_chat;
};

// Run when client connects
io.on("connection", (socket) => {
  console.log("SOCKET IS CONNECTED");
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    //show chat history
    var show_chat_history = db.Chat.findAll({
      where: {
        room: user.room
      }
    }).then(
      function (model) {
        for (item of model) {
          console.log(item.chat_message);
          var chat_date = new Date(item.createdAt);
          var hour = chat_date.getHours();
          var mins = chat_date.getMinutes();
          var time_chat = hour + ":" + mins + " ";
          socket.emit("message", formatMessage(item.username + " ", time_chat, item.chat_message));
        }
      });
    console.log("show_chat_history", show_chat_history);


    // Welcome current user
    socket.emit("message", formatMessage(" ", " ", "Welcome to Chatterbox!"));

    // Broadcast when a user connects
    var time_chat = get_current_time();
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(chatterbox, time_chat, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    // eslint-disable-next-line camelcase
    var time_chat = get_current_time();
    io.to(user.room).emit("message", formatMessage(user.username, time_chat, msg));
    console.log("user.username: ", user.room);
    db.Chat.create({
      // eslint-disable-next-line camelcase
      chat_message: msg,
      username: user.username,
      room: user.room
    });
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    var time_chat = get_current_time();
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(chatterbox, time_chat, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});


// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  // app.listen(PORT, function () {
  //   console.log(
  //     "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in our browser.",
  //     PORT,
  //     PORT
  //   );
  // });
  server.listen(PORT, function () {
    console.log("listen to" + PORT);
  });
});

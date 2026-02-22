const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// store users
let users = {};

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  socket.on("join_chat", (username) => {

    users[socket.id] = username;

    io.emit("chat_message", {
      user: "System",
      message: username + " joined chat"
    });

  });

  socket.on("send_message", (message) => {

    io.emit("chat_message", {
      user: users[socket.id],
      message: message
    });

  });

  socket.on("disconnect", () => {

    io.emit("chat_message", {
      user: "System",
      message: users[socket.id] + " left chat"
    });

    delete users[socket.id];

  });

});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
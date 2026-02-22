const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());


const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
  transports: ["websocket"]   // optional but recommended
});



io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("send_message", (data) => {

        console.log("Message:", data);

        io.emit("receive_message", data);

    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

});

server.listen(5000, () => {
    console.log("Server running on port 5000 ...");
});
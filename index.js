const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  io.emit("connection", socket.id);
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg.toLowerCase());
  });

  socket.on("chat message-chat", (msg) => {
    io.emit("chat message-chat", msg, socket.id);
  });

  socket.on("reset", (msg) => {
    io.emit("reset");
  });

  socket.on("disconnect", () => {
    io.emit("leave person", socket.id);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("listening on *:3000");
});

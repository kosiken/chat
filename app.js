const express = require("express");
const path = require("path");
const sio = require("socket.io");
const cors = require("cors");
const http = require("http");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

const server = http.createServer(app);

const io = sio(server, {
  cors: {
    origin: [
      "http://192.168.43.1:3000",
      "https://kenechat.netlify.app,",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("require-answer", (obj) => {
    const ans = JSON.parse(obj);
    console.log(ans);
    socket.to(ans.room).emit("get-answer", obj);
  });

  socket.on(
    "data-tran-sock",

    (data) => {
      const ans = data;
      console.log(ans);

      //socket.to(ans.room).emit("data-rec", data);

      socket.to(ans.id).emit("data-rec", data);
    }
  );
  socket.on("data-tran", (data) => {
    const ans = data;
    console.log(ans);

    //socket.to(ans.room).emit("data-rec", data);

    socket.to(ans.room).emit("data-rec", data);
  });

  socket.on("join", (config) => {
    console.log("[" + socket.id + "] join ", config);

    let num = 0;
    let room = config.room;
    const _room = io.of("/").adapter.rooms.get(room);
    let ans = { ...config, createOffer: true };
    let broadcast = { ...config, createOffer: false };

    if (_room) num = _room.size;
    if (num == 0) {
      socket.join(room);
    } else {
      broadcast.id = socket.id;
      broadcast.peer_id = socket.id;

      socket.to(room).emit("addPeer", broadcast);
      _room.forEach((id) => socket.emit("addPeer", { ...ans, id }));
      socket.join(room);
    }
    console.log(_room);
  });

  socket.on("join-room", (room) => {
    let num = 0;
    //const room = io.of("/").adapter.rooms.get(room)

    const _room = io.of("/").adapter.rooms.get(room);
    if (_room) num = _room.size;
    console.log(num);
    if (num == 0) {
      socket.join(room);
    } else {
      socket.to(room).emit("createOffer");

      socket.join(room);
    }
  });
});
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log("listening on http://localhost:3000");
});

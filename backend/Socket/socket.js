import express from "express";

import { createServer } from "http";
import { Server } from "socket.io";

export const app = express();
export const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A new member just connected:", socket.id);

  socket.on("send-message", (message) => {
    socket.broadcast.emit("receive-message", message);
  });
});

import express from "express";

import connectToDb from "./Db/Db.js";
import authRouter from "./Routes/auth.routes.js";

import { createServer } from "http";
import { Server } from "socket.io";

import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./Middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

io.on("connection", (socket) => {
  console.log("A new member just connected:", socket.id);

  socket.on("send-message", (message) => {
    socket.broadcast.emit("receive-message", message);
  });
});

app.get("/", (req, res) => {
  res.send("hii there");
});

app.use("/api/auth", authRouter);

app.use(errorHandler);

httpServer.listen(PORT, () => {
  connectToDb();
  console.log("the server is running on the port:", PORT);
});

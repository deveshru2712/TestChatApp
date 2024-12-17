//dependencies

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//file import
import { server, app } from "./Socket/socket.js";
import errorHandler from "./Middleware/errorMiddleware.js";

//db function import
import connectToDb from "./Db/Db.js";

//routes import
import authRouter from "./Routes/auth.routes.js";
import messageRouter from "./Routes/message.routes.js";

dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hii there");
});

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.use(errorHandler);

server.listen(PORT, () => {
  connectToDb();
  console.log("the server is running on the port:", PORT);
});

import express from "express";
import {
  sendMessage,
  receiveMessage,
} from "../Controllers/message.controller.js";

const router = express.Router();

// router.post("/send-message", sendMessage);
router.post("/receive-message", receiveMessage);

export default router;

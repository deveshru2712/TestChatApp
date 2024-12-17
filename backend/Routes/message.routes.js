import express from "express";
import verifyRoute from "../Middleware/verifyRoute.js";
import {
  sendMessage,
  receiveMessage,
} from "../Controllers/message.controller.js";

const router = express.Router();

router.get("/send-message", verifyRoute, sendMessage);
router.post("/receive-message", verifyRoute, receiveMessage);

export default router;

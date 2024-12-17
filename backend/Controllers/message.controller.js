import { io } from "../Socket/socket.js";

export const sendMessage = () => {
  console.log("hii");
};

export const receiveMessage = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

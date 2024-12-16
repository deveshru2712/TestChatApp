import jwt from "jsonwebtoken";

const genToken = (userId, res) => {
  const token = jwt.sign(userId, process.env.JWT_KEY, { expiresIn: "1d" });

  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export default genToken;

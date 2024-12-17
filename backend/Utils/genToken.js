import jwt from "jsonwebtoken";

const genToken = (userId, res) => {
  if (!userId) {
    throw new Error("Invalid userId");
  }

  const token = jwt.sign({ id: userId }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });

  res.cookie("jod", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export default genToken;

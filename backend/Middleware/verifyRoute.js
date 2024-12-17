import jwt from "jsonwebtoken";

const verifyRoute = (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    const id = jwt.decode(token, process.env.JWT_KEY);
    console.log(id);

    // req.userId = id;
  } catch (error) {
    next(error);
  }
};

export default verifyRoute;

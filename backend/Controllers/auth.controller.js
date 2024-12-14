export const signup = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      const error = new Error("Please provide all the fields.");
      error.status = 404;
      throw error;
    }

    if (password.length < 6) {
      const error = new Error("Password should have at least 6 characters.");
      error.status = 400;
      throw error;
    }

    if (password !== confirmPassword) {
      const error = new Error("Password and confirm password do not match.");
      error.status = 400;
      throw error;
    }

    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    next(error);
  }
};

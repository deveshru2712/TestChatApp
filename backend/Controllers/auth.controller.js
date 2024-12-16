import userModel from "../Models/user.models.js";
import userModels from "../Models/user.models.js";
import bcrypt from "bcrypt";
import genToken from "../Utils/genToken.js";

export const signup = async (req, res, next) => {
  try {
    const { username, fullname, email, password, confirmPassword } = req.body;

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

    const checkUser = await userModels.findOne({ email });
    if (checkUser) {
      const error = new Error(
        "This email is already associated with another account"
      );
      error.status = 500;
      throw error;
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newUser = await userModels.create({
      username,
      fullname,
      email,
      password: hashedPassword,
    });

    genToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      message: "User signed up successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Please provide all the fields.");
      error.status = 404;
      throw error;
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      const error = new Error("User not found.");
      error.status = 404;
      throw error;
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      const error = new Error("Incorrect Password.");
      error.status = 500;
      throw error;
    }

    genToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      message: "User Logged in !",
    });
  } catch (error) {
    next(error);
  }
};

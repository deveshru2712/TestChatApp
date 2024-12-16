import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 6,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;

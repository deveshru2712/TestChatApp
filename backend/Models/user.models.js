import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: string,
    minLength: 6,
    required: true,
    unique: true,
  },
  fullname: {
    type: string,
  },
  email: {
    type: string,
    required: true,
    unique: true,
  },
  password: {
    type: string,
    required: true,
    minLength: 6,
  },
});

const userModels = mongoose.model("user", userSchema);

export default userModels;

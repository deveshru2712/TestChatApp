import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.Mongoose_Uri);
    console.log("connected to the database");
  } catch (error) {
    console.log(
      "an error occured while connecting to the database:",
      error.message
    );
  }
};

export default connectToDb;

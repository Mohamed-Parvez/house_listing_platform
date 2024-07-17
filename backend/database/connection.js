import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connection = () => {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("data base connected successfully");
  });
};

export default connection;

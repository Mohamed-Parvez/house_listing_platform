import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connection = () => {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("DataBase Connected");
  });
};

export default connection;

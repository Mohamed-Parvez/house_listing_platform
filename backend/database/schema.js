import mongoose from "mongoose";

const HouseSchema = mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  housePrice: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const House = mongoose.model("house", HouseSchema);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("real users", userSchema);

export default House;

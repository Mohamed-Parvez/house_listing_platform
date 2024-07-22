import mongoose from "mongoose";
const HouseSchema = new mongoose.Schema({
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

const House = new mongoose.model("house", HouseSchema);

export default House;
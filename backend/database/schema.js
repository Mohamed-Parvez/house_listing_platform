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

export default House;

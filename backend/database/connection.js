const mongoose = require("mongoose");

const connection = () => {
  mongoose.connect("mongodb://localhost:27017/house").then(() => {
    console.log("data base connected successfully");
  });
};

module.exports = connection;

const express = require("express");

const connection = require("./database/connection");

const House = require("./database/schema");

const cors = require("cors");

const app = express();

app.use(express.json());

const port = 8080;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (req, res) => {
  const getdata = await House.find();
  res.json(getdata);
});

app.post("/api/house", async (req, res) => {
  const getdata = await House.create(req.body);
  res.json(getdata);
});

app.put("/api/house/", async (req, res) => {
  const id = req.body._id;
  const updateData = await House.findByIdAndUpdate(id, req.body);
  res.json(updateData);
});

app.delete("/api/house/", async (req, res) => {
  const id = req.body.id;
  const deleteData = await House.findByIdAndDelete(id);
  res.json(deleteData);
});

app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
  connection();
});

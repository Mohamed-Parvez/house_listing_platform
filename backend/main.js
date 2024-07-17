import express from "express";
import connection from "./database/connection.js";
import House from "./database/schema.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

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
  const id = req.body._id;
  const deleteData = await House.findByIdAndDelete(id);
  res.json(deleteData);
});

app.listen(process.env.PORT, () => {
  console.log(`the server is running on port ${process.env.PORT}`);
  connection();
});

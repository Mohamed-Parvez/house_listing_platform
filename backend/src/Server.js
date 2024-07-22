import express from "express";
import connection from "../database/connection.js";
import cors from "cors";
import { config } from "dotenv";
import {
  DeleteHouse,
  GetHouse,
  PostHouse,
  UpdateHouse,
} from "./HouseRoutes.js";

const app = express();
config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/api", GetHouse);
app.post("/api/house", PostHouse);
app.put("/api/house/", UpdateHouse);
app.delete("/api/house/", DeleteHouse);

app.listen(process.env.PORT, () => {
  console.log(`Server started at PORT ${process.env.PORT}`);
  connection();
});

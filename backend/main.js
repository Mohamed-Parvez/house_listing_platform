import express from "express";
import connection from "./database/connection.js";
import House from "./database/schema.js";
import cors from "cors";
import dotenv from "dotenv";
import { User } from "./database/schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Authenticate from "./middleware.js";

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

// SIGNUP USER
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const findUser = await User.findOne({ email: email });
  if (findUser) {
    res.json({
      status: "failed",
      message: "email is already taken create a newone",
    });
  } else {
    const encryptPassword = await bcrypt.hashSync(password, 10);
    await User.create({
      name: name,
      email: email,
      password: encryptPassword,
    });
    const generatetoken = await jwt.sign(
      {
        name: name,
        email: email,
      },
      process.env.SECRET
    );
    res.status(201).json({
      staus: "success",
      token: generatetoken,
      message: `user is created successfully`,
    });
  }
});

// LOGIN USER
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    res.json({
      status: "failed",
      message: "invalid email or password",
    });
  } else {
    const decrypt_password = await bcrypt.compareSync(
      password,
      findUser.password
    );
    if (!findUser || !decrypt_password) {
      res.json({
        status: "failed",
        message: "invalid email or password",
      });
    } else {
      const generatetoken = await jwt.sign(
        {
          name: findUser.name,
          email: email,
        },
        process.env.SECRET
      );
      res.status(201).json({
        staus: "success",
        token: generatetoken,
        message: `logged in successfully`,
      });
    }
  }
});

app.get("/protected", Authenticate, (req, res) => {
  res.json({
    email: req.email,
    message: "this is a protected route congrats",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`the server is running on port ${process.env.PORT}`);
  connection();
});

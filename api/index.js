require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const uploadMiddleware = multer({ dest: "uploads/" });
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "iuhods00800whlsg@$%84khjufuhs-=";

app.use(
  cors({
    credentials: true,
    origin: [
      "https://zerotoone.us.to",
      "https://mern-blog-app-lvl4.onrender.com",
      "http://localhost:3000",
    ],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(process.env.MONGODB_URI);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc.id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.json({
        token: {
          id: userDoc.id,
          username,
        },
      });
    });
    // res.json("ok");
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.post("/logout", (req, res) => {
  res.json("log out successful");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  // const { mbg_token } = req.cookies;

  const { title, summary, content, author, userInfo } = req.body;

  const userInfoVal = JSON.parse(userInfo);

  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
    author: userInfoVal.id,
  });

  res.json(postDoc);
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

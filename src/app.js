const express = require("express");
const { connectDB } = require("./config/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
}));

const authRouter = require("../src/routes/auth.js");
const profileRouter = require("../src/routes/profile.js");
const requestRouter = require("../src/routes/request.js");
const userRouter = require("../src/routes/user.js");

app.use("/",authRouter,profileRouter,requestRouter,userRouter);




connectDB()
  .then(() => {
    console.log("DB Connected successfully");
    app.listen(process.env.PORT, () => {
      console.log("Request from client");
    });
  })
  .catch(() => {
    console.error("not able to connect to database");
  });

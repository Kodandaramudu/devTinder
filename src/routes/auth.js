const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, skills } = req.body;
    //Validate request data
    validateSignupData(req);
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      skills,
    });
    await user.save();
    res.send("User added succesfully");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

// LogIn
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordMatch = await user.validatePassword(password);
    if (isPasswordMatch) {
      //Create a Token and add it to the cookie
      const token = await user.getJWT();
      res.cookie("token", token);
      res.json({
        message:"LogIn Successful",
        data:user
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(401).json({message: err.message});
  }
});
// Logout
authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token").json({ message: "Logout successful" });
});

module.exports = authRouter;

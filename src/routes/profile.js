const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const { validateEditData } = require("../utils/validation");
const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

profileRouter.put("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditData(req)) {
      throw new Error("Invalid request for edit fields");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName},Your Details updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(401).json({message:err.message});
  }
});

profileRouter.patch("/profile/editPassword", userAuth, async (req, res) => {
  try {
    const { emailId, currentPassword, newPassword } = req.body;
    const user = req.user;

    if (!user) {
      throw new Error("Email is not valid");
    }
    // Compare the current password is same or not
    const isCurrentPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (isCurrentPassword) {
      throw new Error("Current password is not valid!!!!");
    }
    //Compare newPassword is same like old password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new Error("New password is not the old password!!!!");
    }
    //Validate the Password
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Password is not strong, Enter new password");
    }
    //Hash the Password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    user.password = passwordHash;
    await user.save();
    res.send(`${user.firstName}, Your Password updated successfully`);
  } catch (err) {
    res.status(400).send("Error is: " + err.message);
  }
});

module.exports = profileRouter;

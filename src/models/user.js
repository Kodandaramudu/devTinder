const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter correct emailId: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    skills: {
      type: [],
      maxLength: 8,
    },
    photoUrl: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/z/default-profile-picture-avatar-user-icon-person-head-icons-anonymous-male-female-businessman-photo-placeholder-social-network-272206807.jpg",
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: this._id }, "Namaste@nodejs", {
    expiresIn: "7d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (passwordSentByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordMatch = await bcrypt.compare(
    passwordSentByUser,
    passwordHash
  );
  return isPasswordMatch;
};

module.exports = mongoose.model("User", userSchema);

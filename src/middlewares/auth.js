const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token!!!!");
    }
    const decodeddata = await jwt.verify(token, "Namaste@nodejs");
    const { _id } = decodeddata;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Invalid User");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(404).send(err.message);
  }
};
module.exports = userAuth;

const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");

profileRouter.get("/profile", userAuth,async (req,res)=>{
    try{
      const user = req.body;
      res.send(user);
  
    }catch(err){
      res.send("Error: "+err.message);
    }
  });

  module.exports = profileRouter;
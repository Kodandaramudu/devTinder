const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req,res)=>{
    try{  
      const user = req.body;
      res.send(user.firstName +" sent connection request")
    }catch(err){
      res.status(400).send("Invalid request!!")
    }
  });

  module.exports = requestRouter;
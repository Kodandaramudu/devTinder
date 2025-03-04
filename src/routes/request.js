const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res)=>{
try{
  const fromUser = req.user;
  const fromUserId = req.user._id;
  const {toUserId, status} = req.params;
  //check the staus
  const isAllowedStatus = ["ignored", "interested"];
  if(!isAllowedStatus.includes(status)){
    throw new Error("not a valid status request");
  }
    //checking the toUser is exist in oir DB or not
    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(400).json({
        message:"Invalid "+ toUserId
      });
    }
  //Checking if there is already a connection will exist
  const existingConnectionrequest = await ConnectionRequest.findOne({
    $or:[
      {fromUserId, toUserId},
      {fromUserId:toUserId, toUserId:fromUserId}
    ]
  });
  if(existingConnectionrequest){
    return res.status(400).json({message:"Connection has been exist before "});
  }
  const connectionRequest = new ConnectionRequest({
    fromUserId,
    toUserId,
    status
  });
  const data = await connectionRequest.save();
  res.json({
    message: fromUser.firstName+ " sent " + toUser.firstName +" connection successfully",
    data
  })
} catch(err){
  res.status(400).json({message: err.message});
}

})

  module.exports = requestRouter;
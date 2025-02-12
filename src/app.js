const express = require("express");

const app = express();

app.use("/home",(req,res)=>{
res.send("Sent back from server");
});

app.use("/profile",(req,res)=>{
    res.send("This is the profile sent from server");
    });

app.listen(7777,()=>{
    console.log("Request from client");
});
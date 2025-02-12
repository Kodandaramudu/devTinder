const express = require("express");

const app = express();

app.get("/profile/:profileId",(req,res)=>{
    console.log(req.params);
    res.send("Namaste Ram");
    });

app.post("/profil+e",(req,res)=>{
res.send("data posted succesfully");
});

app.put("/profil(ef)",(req,res)=>{
    res.send("data upadated succesfully");
    });

app.patch("/profil*e",(req,res)=>{
    res.send("data patches are done succesfully");
    });

app.delete("/profile",(req,res)=>{
        res.send("data deleted succesfully");
        });

app.listen(7777,()=>{
    console.log("Request from client");
});
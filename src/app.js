const express = require("express");
const {authAdmin, authUser} = require("./middlewares/auth")
const app = express();

app.use(["/admin","/user"], authAdmin,authUser,(req,res,next)=>{
    next();
});

// app.use("/user",userAdmin,(req,res,next)=>{
//     next();
// });
app.get("/user/getUser",(req,res)=>{
    res.send("This is new User");
});

app.get("/admin/getAllData",(req,res)=>{
    res.send("get All the data");
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("deleted the data");
        });

app.listen(7777, () => {
    console.log("Request from client");
});
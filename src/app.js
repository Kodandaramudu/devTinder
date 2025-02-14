const express = require("express");

const { connectDB } = require("./config/database.js");
const User = require("./models/user.js");
const app = express();

app.post("/signup", async (req,res)=>{
 const user = new User({
            "firstName":"Ram",
            "lastName":"Jammula",
            "emailId":"ram@jammula.com",
            "password":"jhbywegdyd",
            "age":"25",
            "gender":"Male"
        });
    try{
        await user.save()
        res.send("User data saved successfully");
    }
    catch (err){
        res.status(401).send("Error message is"+err.message);
    }});

connectDB()
.then(() => {
    console.log("DB Connected successfully");
    app.listen(7777, () => {
        console.log("Request from client");
    })
})
.catch(()=>{
    console.error("not able to connect to database");
})

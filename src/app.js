const express = require("express");

const { connectDB } = require("./config/database.js");
const User = require("./models/user.js");
const app = express();

app.use(express.json());

// if we want to retrive doc from db by emailId or some key values
app.get("/user",async (req,res)=>{
    try{
        const users = await User.find({emailId:req.body.emailId});
        console.log(users);
        if(users.length>0) {
             res.send(users);
        }
    } catch(err){
        res.status(404).send("something went wrong")
    }
})

//if we want to retrive all uers from the database
app.get("/feed",async (req,res)=>{
    try{
        const users = await User.find({});
        if(!users){
            res.send("Users not found")
        } else{
            res.send(users);
        }
    } catch(err){
        res.status(404).send("something went wrong")
    }
})

//if we want to delete one user from the database
app.delete("/user",async (req,res)=>{
    try{
          await User.findByIdAndDelete(req.body.userId);
          res.send("user deleted successfully!!");
    } catch(err){
        res.status(404).send("Error is"+err.message);
    }
})

//if we want to update the user by userId
app.patch("/user/:userId",async(req,res)=>{
    const data = req.body;
  const userId = req.params.userId;

  try{
    const ALLOWED_UPDATES = ["skills","password","age","emailId","photoUrl"];
    const isAllowedUpdates = Object.keys(data).every((k)=>
    ALLOWED_UPDATES.includes(k));
    
    if(!isAllowedUpdates){
        console.log(isAllowedUpdates);
        throw new Error("Can not update the data");
    }

     const user = await User.findByIdAndUpdate(userId,data,{ runValidators: true } );
         res.send("User Updated Successfully");
  }catch(err){
    res.send(err.message);
  }
})

//creating a new instance for the model
app.post("/signup",async (req,res)=>{
const user = new User(req.body);
try{
    await user.save();
    res.send("User added succesfully");
} catch (err){
      res.send("Error is"+err.message);
}
})

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

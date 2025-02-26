const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user.js");
const { validateSignupData } = require("./utils/validation.js");
const cookieParser = require("cookie-parser");
const userAuth = require("./middlewares/auth.js");

const app = express();

app.use(express.json());
app.use(cookieParser());


//Signup API
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, skills } = req.body;
    //Validate request data
    validateSignupData(req);
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      skills,
    });
    await user.save();
    res.send("User added succesfully");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

// LogIn
app.post("/login", async (req,res)=>{
    try{
        const {emailId,password} = req.body; 
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordMatch = await user.validatePassword(password);
        if(isPasswordMatch){
          //Create a Token and add it to the cookie
          const token = await user.getJWT();
          await res.cookie("token",token);
            res.send("LogIn Successful");       
        } else{
            throw new Error("Invalid Credentials");
        }
        

    }catch(err){
        res.send("Error is: "+err.message)
    }
})

//Profile API
app.get("/profile", userAuth,async (req,res)=>{
  try{
    const user = req.body;
    res.send(user);

  }catch(err){
    res.send("Error: "+err.message);
  }
})

//sendConnectionrequest
app.post("/sendConnectionRequest", userAuth, async (req,res)=>{
  try{  
    const user = req.body;
    res.send(user.firstName +" sent connection request")
  }catch(err){
    res.status(400).send("Invalid request!!")
  }
})

connectDB()
  .then(() => {
    console.log("DB Connected successfully");
    app.listen(7777, () => {
      console.log("Request from client");
    });
  })
  .catch(() => {
    console.error("not able to connect to database");
  });

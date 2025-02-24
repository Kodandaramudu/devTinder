const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:50,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:50,
        trim:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter correct emailId: "+ value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        
        
    },
    age:{
        type:Number,
        min:18

    },
    gender:{
        type:String,
        validate(value){
        if(!["male","female","others"].includes(value)){
              throw new Error("Gender is not valid");
              
        }
        }
    },
    skills:{
         type:[]
    },
    photoUrl:{
        type:String,
        default:"https://thumbs.dreamstime.com/z/default-profile-picture-avatar-user-icon-person-head-icons-anonymous-male-female-businessman-photo-placeholder-social-network-272206807.jpg"
    }
},{timestamps:true});

module.exports = mongoose.model("User",userSchema );
const mongoose = require("mongoose");

const connectDB = async () =>{
    console.log("did u check me!!");
    await mongoose.connect(process.env.DB_CONNECTION_SECRET);
    
}
module.exports = {connectDB}
const mongoose = require("mongoose");

const connectDB = async () =>{
    console.log("did u check me!!");
    await mongoose.connect("mongodb+srv://ramchowdary0308:iaRXEa1xPqmxsEvZ@namastenode.k2woz.mongodb.net/devTinder");
}
module.exports = {connectDB}
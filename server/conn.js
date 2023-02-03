const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://Parmeet:ParmeetDodo@cluster0.vfo7ksx.mongodb.net/test")
.then(()=>{console.log("Connected to mongoose");})
.catch((error)=>{console.log(error);})


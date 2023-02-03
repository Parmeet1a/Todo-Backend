const express = require("express");
const app = express();
const mongoose = require('../server/conn');
require("../Models/userSchema")


app.use(express.json())
app.use(require("../Router/routes"))

app.get('/',(req,res)=>{

    res.send("I am express")
})


app.listen(5000,()=>{

    console.log("Listening to server")
})
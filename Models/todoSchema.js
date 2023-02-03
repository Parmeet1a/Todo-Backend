const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({


    

    title :{

        type : String,
        required : true
    },

    created :{
        type : String,
        default:new Date().toLocaleDateString()
    },

    status:{
        type : String,
        default : "Created",
        required : true
    },

    endDate : {

        type : String,
        default : ""

    },

    owner : {

        default : "Me",
        type : String,
        
    }

});


const Todo = new mongoose.model("Todo",todoSchema);

module.exports = Todo ;
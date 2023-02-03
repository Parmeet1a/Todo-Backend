const express = require("express");
const mongoose = require("mongoose")
const app = express();
const router = express.Router();
const User = require("../Models/userSchema");
const Todo = require("../Models/todoSchema");


router.get("/", (req, res) => {
  res.send("Hello from router");
});

router.post("/signup", async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, confirmpassword } = req.body;

    if (!name || !email || !password || !confirmpassword) {
      return res.status(422).json({ error: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email: email });

    // if (userExists) {
    //   return res.status(422).json({ error: "User Already exists" });
    // }

    const user = new User({
      name,
      email,
      password,
      confirmpassword,
    });

    const saveUser = await user.save();

    if (saveUser) {
      return res.status(201).json({ message: "Data saved succesfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// <---------------------------------------------------------Sign In ------------------------------------------------------->

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "Please fill all fields" });
    }

    const emailValid = await User.findOne({ email: email });
    console.log(emailValid);

    if (!emailValid) {
      return res.status(422).json({ error: "email is not valid" });
    }

    console.log(emailValid.password);
    if (emailValid.password === password) {
      return res.status(200).json({ message: "You are logged in" });
    } else {
      return res.status(400).json({ error: "Invalid Details" });
    }
  } catch (error) {
    console.log(error);
  }
});

// <-------------------------------------Todo Data Post ---------------------------------------------->

router.post("/todo", async (req, res) => {
  try {
    const { title, created, status, endDate, owner } = req.body;

    if (!title) {
      return res.status(422).json({ error: "Please fill all required fields" });
    }

    const todoData = new Todo({
      title,
      created,
      status,
      endDate,
      owner,
    });

    const saveData = await todoData.save();

    if (saveData) {
      return res.status(200).json({ message: "Todo created" });
    }
  } catch (error) {
    console.log(error);
  }
});

// <------------------------------------------Get Todo List ------------------------------------>

router.get("/todo", async (req, res) => {
  try {
    const collections = await Todo.find();
    // console.log(collections);
    return res.status(200).send(collections);
  } catch (error) {
    console.log(error);
  }
});

// <---------------------------------------Status Update ----------------------------------------->

router.put("/todo", async (req, res) => {
  try {
    const { _id, status } = req.body;

    const updater = await Todo.findByIdAndUpdate(_id, {
      $set: { status: status },
    });

    if (updater) {
      return res.status(200).json({ message: "Updated Successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});



//  <------------------------------------------Delete Todo -------------------------------------------->


router.delete('/todo', async(req,res)=>{

    try {
        
        const _id = req.body;
    
        const deletedTodo = await Todo.deleteOne(_id);

        if(deletedTodo){

            res.status(200).json({message : "Deleted Successfully"});
        }
    } catch (error) {
        
        console.log(error);
    }

})


// <--------------------------------------Update End Date ------------------------------->


router.put("/todo/endDate", async(req,res)=>{

  try {
    const {_id,update} = req.body;
  
    const finder = await Todo.findByIdAndUpdate(_id,{
  
      $set:{endDate:update}
  
    });

    if(finder){

      return res.status(200).json({message:"Updated Successfully"});
    }
    
  } catch (error) {
   
    console.log(error);
  }

})




module.exports = router;

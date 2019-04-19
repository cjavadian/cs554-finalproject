const express = require("express");
const router = express.Router();
const data=require("../data/");
const userData=data.user;

router.post("/",async(req,res)=>{
  const postData=req.body;
  try{
    const {first_name,last_name,user_name,email}=postData;
    //check_para(first_name,last_name,user_name,email);
    const newPost = await userData.addUser(first_name,last_name,user_name,email);
    res.status(200).json(newPost);
  }
  catch(e){
    res.status(500).json({ error: e });
  }
});

module.exports = router;

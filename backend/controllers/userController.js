const User = require("../models/User");


exports.getUser=async(req,res)=>{
    let {id}=req.params;

    let user=await User.findById(id)

    res.json(user)
}
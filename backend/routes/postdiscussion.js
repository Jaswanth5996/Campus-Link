const Discussion = require('../models/discussion.js');
const express=require('express');
const router=express.Router();

router.post('/postdiscussion',async(req,res)=>{
    const{ title, description, createdBy } = req.body;
    if (!title || ! description ||!createdBy)
    {
        return res.status(401).json({error:'All fields are required'});
    }
    try{
        const newdiscssion=new Discussion({
            title,description,createdBy    })
        await newdiscssion.save();
        res.status(201).json({message:'Discussion posted successfully', discussion:newdiscssion});
    }
    catch(err){
        res.status(500).json({err:"faileed to post discussion"})
    }
})
router.get('/fetchalldiscussions',async(req,res)=>{
    try{
        const response=await Discussion.find().sort({createdAt:-1});
        return res.status(200).json(response);
    }
    catch(err){
        return res.status(500).json({err:"failed to fetch discussions"});
    }
})
module.exports=router;


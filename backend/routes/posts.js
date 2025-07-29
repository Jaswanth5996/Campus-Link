const express = require('express');
const router = express.Router();
const AdminPost = require('../models/Adminposts');

router.post('/post',async (req,res)=>{
const { title, description, date, location, imageUrl, createdBy } = req.body;
    const newevent={
        title,
        description,
        date,
        location,
        imageUrl: imageUrl,
        createdBy: createdBy
    }
    if (!title || !description || !date || !location || !imageUrl || !createdBy) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try{
        const newpost=new AdminPost(newevent);
        await newpost.save();
        res.status(201).json({ message: 'Event created successfully', event: newpost });
    }
    catch(err){
        console.error(err);
 res.status(500).json({ message: 'Failed to create post', error: err.message });    }
})
router.get('/', async (req, res) => {
    try {
        const events = await AdminPost.find();
        res.status(200).json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch events', error: err.message });
    }
});
module.exports = router;

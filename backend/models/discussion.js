const mongoose = require('mongoose');

const discussionschema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
}, { timestamps: true }); 

const Discussion = mongoose.model('Discussion', discussionschema);
module.exports = Discussion;
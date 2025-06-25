const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  subject: String,
  year: String,
  description: String,
  fileUrl: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);

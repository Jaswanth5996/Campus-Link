const Note = require('../models/Note');
const path = require('path');

exports.uploadNote = async (req, res) => {
  const { title, subject, year, description } = req.body;
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'File is required' });
  try {
    const note = new Note({
      title,
      subject,
      year,
      description,
      fileUrl: `/uploads/${file.filename}`, 
      uploadedBy: req.user._id,
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload note' });
  }
};

exports.getAllNotes = async (req, res) => {
  const { subject, year } = req.query;
  const filter = {};

  if (subject) filter.subject = subject;
  if (year) filter.year = year;

  try {
    const notes = await Note.find(filter).populate('uploadedBy', 'username');
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

exports.getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({ uploadedBy: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user notes' });
  }
};

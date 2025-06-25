const express = require('express');
const router = express.Router();
const { uploadNote, getUserNotes, getAllNotes } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', protect, upload.single('file'), uploadNote);
router.get('/my-notes', protect, getUserNotes);
router.get('/all', getAllNotes);

module.exports = router;

const mongoose = require('mongoose');

const physioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports = mongoose.model('physios', physioSchema);

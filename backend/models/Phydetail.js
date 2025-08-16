const mongoose = require('mongoose');

const phyDetailSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Physio',
      required: true
    },
    condition: {
      type: String,
      required: true
    },
    pt_manage: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('phydetails', phyDetailSchema);

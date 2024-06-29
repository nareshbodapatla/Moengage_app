const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  breweryId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);

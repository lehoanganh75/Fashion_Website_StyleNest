const mongoose = require('mongoose');

// Định nghĩa schema cho Feature
const FeatureSchema = new mongoose.Schema({
  id: { type: String, required: true },
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

// Tạo và xuất model từ schema
const Feature = mongoose.model('Feature', FeatureSchema);

module.exports = Feature;
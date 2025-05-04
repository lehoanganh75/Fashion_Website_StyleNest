const mongoose = require('mongoose');

// Định nghĩa schema cho Banner
const BannerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  img: { type: String, required: true },
  alt: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  label: { type: String, required: true }
});

// Tạo và xuất model từ schema
const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;
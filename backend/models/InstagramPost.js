const mongoose = require('mongoose');

// Định nghĩa schema cho InstagramPost
const InstagramPostSchema = new mongoose.Schema({
  id: { type: String, required: true },
  imageUrl: { type: String, required: true },
  alt: { type: String, required: true }
});

// Tạo và xuất model từ schema
const InstagramPost = mongoose.model('InstagramPost', InstagramPostSchema);

module.exports = InstagramPost;
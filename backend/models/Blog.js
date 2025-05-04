const mongoose = require('mongoose');

// Định nghĩa schema cho Blog
const BlogSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  imageSrc: { type: String, required: true },
  category: { type: String, required: true },
  categoryLink: { type: String, required: true },
  date: { type: String, required: true },
  shortInfo: { type: String, required: true },
  description: { type: String, required: true }
});

// Tạo và xuất model từ schema
const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
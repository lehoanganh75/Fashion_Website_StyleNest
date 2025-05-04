const mongoose = require('mongoose');

// Định nghĩa schema cho Product
const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  colors: [{ type: String }],
  size: [{ type: String }],
  condition: { type: Boolean, required: true },
  SKU: { type: String, required: true },
  descriptions: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true }
    }
  ],
  details: {
    material: { type: String, required: true },
    fabric: { type: String, required: true },
    origin: { type: String, required: true },
    careInstructions: { type: String, required: true }
  },
  thumbnails: [{ type: String }],
  rating: { type: Number, required: true },
  review: { type: Number, required: true },
  slogan: { type: String, required: true },
  dateAdded: { type: Date, required: true },
  instock: { type: Number, required: true }
});

// Tạo và xuất model từ schema
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
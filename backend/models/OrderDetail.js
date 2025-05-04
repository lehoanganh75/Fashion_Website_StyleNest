const mongoose = require('mongoose');

// Định nghĩa schema cho OrderDetail
const OrderDetailSchema = new mongoose.Schema({
  id: { type: String, required: true },
  status: { type: String, required: true },
  shop: {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    chat: { type: Boolean, required: true },
    viewShop: { type: Boolean, required: true }
  },
  product: {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    id: { type: String, required: true },
    quantity: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  timeline: [
    {
      status: { type: String, required: true },
      title: { type: String, required: true },
      date: { type: String, required: true },
      icon: { type: String, required: true }
    }
  ],
  delivery: {
    carrier: { type: String, required: true },
    trackingNumber: { type: String, required: true },
    recipient: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  trackingEvents: [
    { time: { type: String, required: true }, status: { type: String, required: true }, isCompleted: { type: Boolean, required: true } }
  ],
  payment: {
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    discount: { type: Number, required: true },
    total: { type: Number, required: true }
  }
});

// Tạo và xuất model từ schema
const OrderDetail = mongoose.model('OrderDetail', OrderDetailSchema);

module.exports = OrderDetail;
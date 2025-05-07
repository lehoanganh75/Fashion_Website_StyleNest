const mongoose = require('mongoose');

// Định nghĩa schema cho Order
const OrderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  customerName: { type: String, required: true },
  total: { type: Number, required: true },
  address: { type: String, required: true },
  orderDetails: [
    {
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      size: { type: String, required: true },
      color: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
      img: { type: String, required: true }
    }
  ],
  paymentMethod: { type: String, required: true }, 
  timeline: [
    {
      status: { type: String, required: true },
      orderDate: { type: String, required: true }
    }
  ]
}, { versionKey: false });

// Tạo và xuất model từ schema
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
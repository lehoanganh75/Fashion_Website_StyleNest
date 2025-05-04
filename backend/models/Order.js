const mongoose = require('mongoose');

// Định nghĩa schema cho Order
const OrderSchema = new mongoose.Schema({
  id: { type: String, required: true },
  img: { type: String, required: true },
  email: { type: String, required: true },
  customerName: { type: String, required: true },
  orderDate: { type: String, required: true },
  total: { type: Number, required: true },
  status: { type: String, required: true },
  address: { type: String, required: true },
  orderDetails: [
    {
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
      img: { type: String, required: true }
    }
  ]
});

// Tạo và xuất model từ schema
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
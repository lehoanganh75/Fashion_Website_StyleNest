const mongoose = require('mongoose');

// Định nghĩa schema cho Customer
const CustomerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  customerName: { type: String, required: true },
  gender: { type: String, required: true },
  date: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  img: { type: String, required: true },
  address: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      addressType: { type: String, required: true },
      isDefault: { type: Boolean, default: false }
    }
  ]
});

// Tạo và xuất model từ schema
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
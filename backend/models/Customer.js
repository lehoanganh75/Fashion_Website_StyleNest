const mongoose = require('mongoose');

// Định nghĩa schema cho Customer
const CustomerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  customerName: { type: String, required: true },
  gender: { type: String, required: true },
  date: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  img: { type: String, default: 'http://localhost:5000/imgs/aothunnamslimfitbasic1.jpg' },
  address: [
    {
      id: { type: String },
      name: { type: String },
      phone: { type: String },
      address: { type: String },
      addressType: { type: String },
      isDefault: { type: Boolean, default: false }
    }
  ]
}, { versionKey: false });

// Tạo và xuất model từ schema
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
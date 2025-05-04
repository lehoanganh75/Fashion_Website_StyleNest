const mongoose = require('mongoose');

// Định nghĩa schema cho Account
const AccountSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true }
});

// Tạo và xuất model từ schema
const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
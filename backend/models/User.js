const mongoose = require('mongoose');

// Định nghĩa schema cho User
const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  date: { type: String, required: true },
  phone: { type: String, required: true },
  img: { type: String, required: true },
  account: {
    accountId: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true }
  }
});

// Tạo và xuất model từ schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
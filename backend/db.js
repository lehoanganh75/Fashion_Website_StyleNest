const mongoose = require('mongoose');
require('dotenv').config();  // Load biến môi trường từ .env

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL);

// Lắng nghe sự kiện kết nối
const db = mongoose.connection;
db.on('error', console.error.bind(console, '❌ MongoDB connection error:'));
db.once('open', () => console.log('✅ MongoDB Atlas connected'));

module.exports = db;
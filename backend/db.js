const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://admin:28102004aZ@mongodb.uytli1b.mongodb.net/fashion_db';

// Kết nối MongoDB Atlas
mongoose.connect(mongoURI);

// Lắng nghe sự kiện kết nối
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('✅ MongoDB Atlas connected'));

module.exports = db;
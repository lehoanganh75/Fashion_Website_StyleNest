const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/fashion_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Mô hình dữ liệu
const Account = mongoose.model('Account', {
  id: String,
  username: String,
  password: String,
  email: String,
  role: String
});

const Customer = mongoose.model('Customer', {
  id: String,
  customerName: String,
  gender: String,
  date: String,
  phone: String,
  email: String,
  img: String
});

const Feature = mongoose.model('Feature', {
  id: String,
  icon: String,
  title: String,
  description: String
});

const FromTheBlog = mongoose.model('FromTheBlog', {
  id: String,
  title: String,
  imageSrc: String,
  category: String,
  categoryLink: String,
  date: String,
  shortInfo: String,
  description: String
});

const InstagramPost = mongoose.model('InstagramPost', {
  id: String,
  imageUrl: String,
  alt: String
});

const OrderDetail = mongoose.model('OrderDetail', {
  id: String,
  status: String,
  shop: {
    name: String,
    avatar: String,
    chat: Boolean,
    viewShop: Boolean
  },
  product: {
    name: String,
    category: String,
    image: String,
    id: String,
    quantity: Number,
    originalPrice: Number,
    price: Number
  },
  timeline: [
    {
      status: String,
      title: String,
      date: String,
      icon: String
    }
  ],
  delivery: {
    carrier: String,
    trackingNumber: String,
    recipient: String,
    phone: String,
    address: String
  },
  trackingEvents: [
    { time: String, status: String, isCompleted: Boolean }
  ],
  payment: {
    subtotal: Number,
    shipping: Number,
    discount: Number,
    total: Number
  }
});

// Mô hình Order
const Order = mongoose.model('Order', {
  id: String,
  img: String,
  email: String,
  customerName: String,
  orderDate: String,
  total: Number,
  status: String,
  address: String,
  orderDetails: [
    {
      productId: String,
      productName: String,
      quantity: Number,
      price: Number,
      total: Number,
      img: String
    }
  ]
});

// API Endpoints
app.get('/api/accounts', async (req, res) => {
  try {
    const data = await Account.find({});
    res.json(data);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching accounts', error });
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    const data = await Customer.find({});
    res.json(data);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching customers', error });
  }
});

app.get('/api/features', async (req, res) => {
  try {
    const data = await Feature.find({});
    res.json(data);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching features', error });
  }
});

app.get('/api/fromTheBlogs', async (req, res) => {
  try {
    const data = await FromTheBlog.find({});
    res.json(data);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching blog data', error });
  }
});

app.get('/api/instagramPosts', async (req, res) => {
  try {
    const data = await InstagramPost.find({});
    res.json(data);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching Instagram posts', error });
  }
});

app.get('/api/orderDetails', async (req, res) => {
  try {
    const data = await OrderDetail.find({});
    res.json(data);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching order details', error });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const data = await Order.find({});
    res.json(data);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching orders', error });
  }
});

// Khởi động server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

// Import các route
const accountRoutes = require('./routes/accountRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const blogRoutes = require('./routes/blogRoutes');
const customerRoutes = require('./routes/customerRoutes');
const featureRoutes = require('./routes/featureRoutes');
const instagramRoutes = require('./routes/instagramRoutes');
const orderDetailRoutes = require('./routes/orderDetailRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Sử dụng các route cho phù hợp
app.use('/api/accounts', accountRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/instagramPosts', instagramRoutes);
app.use('/api/orderDetails', orderDetailRoutes);
app.use('/api/orders', orderRoutes);  
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Khởi động server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

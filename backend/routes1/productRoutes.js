const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Lấy danh sách đơn hàng
router.get('/', async (req, res) => {
    try {
      const data = await Product.find({});
      res.json(data);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching products', error });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
    try {
      const data = await Order.find({});
      res.json(data);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching orders', error });
    }
});

// Tạo đơn hàng mới
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Đơn hàng đã được lưu", order: savedOrder });
  } catch (error) {
    console.error("Lỗi khi lưu đơn hàng:", error);
    res.status(500).json({ message: "Lỗi khi lưu đơn hàng", error });
  }
});

router.get('/search', async (req, res) => {
  const { customerName } = req.query; // Lấy customerName từ query params
  try {
      if (customerName) {
          // Tìm kiếm đơn hàng theo tên khách hàng, không phân biệt hoa thường
          const results = await Order.find({ customerName: { $regex: customerName, $options: 'i' } });
          return res.json(results);
      }
      const allOrders = await Order.find({});
      res.json(allOrders);
  } catch (error) {
      res.status(500).send({ message: 'Error searching orders', error });
  }
});


module.exports = router;
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

module.exports = router;
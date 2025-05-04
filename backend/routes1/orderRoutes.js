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

module.exports = router;
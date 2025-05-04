const express = require('express');
const router = express.Router();
const OrderDetail = require('../models/OrderDetail');

router.get('/', async (req, res) => {
    try {
      const data = await OrderDetail.find({});
      res.json(data);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching order details', error });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

router.get('/', async (req, res) => {
    try {
      const data = await Customer.find({});
      res.json(data);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching customers', error });
    }
});


router.get('/search', async (req, res) => {
  const { phone } = req.query;
  try {
      if (phone) {
          const results = await Customer.find({ phone: { $regex: phone, $options: 'i' } }); 
          return res.json(results);
      }
      const allCustomers = await Customer.find({});
      res.json(allCustomers);
  } catch (error) {
      res.status(500).send({ message: 'Error searching customers', error });
  }
});

module.exports = router;
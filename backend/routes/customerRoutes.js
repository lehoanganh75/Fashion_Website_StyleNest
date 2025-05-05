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

module.exports = router;
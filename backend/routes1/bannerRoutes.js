const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');

router.get('/', async (req, res) => {
    try {
      const data = await Banner.find({});
      res.json(data);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching accounts', error });
    }
});

module.exports = router;
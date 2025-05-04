const express = require('express');
const router = express.Router();
const Feature = require('../models/Feature');

router.get('/', async (req, res) => {
    try {
      const data = await Feature.find({});
      res.json(data);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching features', error });
    }
});

module.exports = router;
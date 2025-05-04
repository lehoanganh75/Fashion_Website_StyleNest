const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
    try {
      const data = await Blog.find({});
      res.json(data);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching blog data', error });
    }
});

module.exports = router;
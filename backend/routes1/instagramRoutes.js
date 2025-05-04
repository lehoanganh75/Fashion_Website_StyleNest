const express = require('express');
const router = express.Router();
const InstagramPost = require('../models/InstagramPost');

router.get('/', async (req, res) => {
    try {
      const data = await InstagramPost.find({});
      res.json(data);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching Instagram posts', error });
    }
});

module.exports = router;
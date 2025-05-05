const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const data = await User.find({});
        res.json(data);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching users', error });
    }
});

module.exports = router;
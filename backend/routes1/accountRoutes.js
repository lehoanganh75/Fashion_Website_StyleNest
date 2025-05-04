const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

router.get('/', async (req, res) => {
  try {
    const data = await Account.find({});
    res.json(data);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching accounts', error });
  }
});

module.exports = router;
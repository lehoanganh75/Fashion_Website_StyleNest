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

router.put('/:id', async (req, res) => {
    const { id } = req.params;  
    console.log(req.body);
    const { name, gender, date, phone } = req.body;

    console.log("Dữ liệu người dùng sau khi sửa:", name, gender, date, phone);
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { id: id },  
        { name, gender, date, phone },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
      res.status(500).json({ message: "Lỗi khi cập nhật người dùng", error });
    }
  });
  
module.exports = router;
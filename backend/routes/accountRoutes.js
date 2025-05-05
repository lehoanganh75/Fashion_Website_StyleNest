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

// Tạo đơn tài khoản
router.post('/', async (req, res) => {
  try {
    const newAccount = new Order(req.body);
    const savedAccount = await newAccount.save();
    res.status(201).json({ message: "Đơn hàng đã được lưu", account: savedAccount });
  } catch (error) {
    console.error("Lỗi khi lưu đơn hàng:", error);
    res.status(500).json({ message: "Lỗi khi lưu đơn hàng", error });
  }
});

// Cập nhật tài khoản
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { userName, password, email, role } = req.body;

  try {
    const updatedAccount = await Account.findOneAndUpdate(
      { id: id }, // điều kiện là id tự quản lý
      { userName , password, email, role },
      { new: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json({ message: 'Account updated successfully', updatedAccount });
  } catch (error) {
    console.error("Lỗi khi cập nhật tài khoản:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật tài khoản", error });
  }
});

module.exports = router;
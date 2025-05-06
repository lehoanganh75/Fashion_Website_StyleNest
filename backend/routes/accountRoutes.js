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

// Tạo tài khoản
router.post('/', async (req, res) => {
  try {
    const newAccount = new Account(req.body);
    const savedAccount = await newAccount.save();
    res.status(201).json({ message: "Tài khoản đã được lưu", account: savedAccount });
  } catch (error) {
    console.error("Lỗi khi lưu tài khoản:", error);
    res.status(500).json({ message: "Lỗi khi lưu tài khoản", error });
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

// Xóa tài khoản
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Xóa tài khoản theo id (dùng id hoặc _id tùy theo thiết kế)
    const deletedAccount = await Account.findOneAndDelete({ id: id });

    if (!deletedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Lấy tất cả tài khoản hiện có
    let accounts = await Account.find();

    // Cập nhật lại id cho các tài khoản
    for (let i = 0; i < accounts.length; i++) {
      accounts[i].id = (i + 1).toString();
      await accounts[i].save(); // Lưu lại các thay đổi
    }

    // Sau khi cập nhật lại id, sắp xếp lại các tài khoản theo id
    accounts = await Account.find().sort({ id: 1 });

    res.status(200).json({ message: 'Account deleted and IDs updated successfully', deletedAccount });
  } catch (error) {
    console.error("Lỗi khi xóa tài khoản:", error);
    res.status(500).json({ message: "Lỗi khi xóa tài khoản", error });
  }
});

module.exports = router;
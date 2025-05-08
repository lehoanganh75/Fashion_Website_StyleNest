const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const Customer = require('../models/Customer');
const { console } = require('inspector');
const upload = require('../config/multer-config');

router.get('/', async (req, res) => {
    try {
      const data = await Customer.find({});
      res.json(data);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching customers', error });
    }
});

// Lưu khách hàng
router.post("/", upload.single('image'), async (req, res) => {
  try {
    if (!req.body.customer) {
      return res.status(400).json({ error: 'Thiếu dữ liệu khách hàng' });
    }

    const customerData = JSON.parse(req.body.customer);

    if (req.file) {
      const imagePath = `${req.protocol}://${req.get("host")}/imgs/${req.file.filename}`;
      customerData.img = imagePath;
    } else {
      // Gán ảnh mặc định
      customerData.img = 'http://localhost:5000/imgs/aothunnamslimfitbasic1.jpg';
    }

    const customer = new Customer(customerData);
    await customer.save();

    res.status(201).json(customer);
  } catch (err) {
    console.error("Lỗi khi lưu khách hàng:", err);
    res.status(500).json({ error: "Không thể lưu khách hàng", message: err.message });
  }
});

// Cập nhật địa chỉ khách hàng
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { addressList } = req.body; // danh sách địa chỉ mới
  
  console.log("addressList", addressList);

  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { id: id },
      { address: addressList },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Account not found' });
    }

    console.log("Dữ liệu trả về từ backend:", updatedCustomer);

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error("Lỗi khi cập nhật địa chỉ:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật địa chỉ", error });
  }
});

router.get('/search', async (req, res) => {
  const { phone } = req.query;
  try {
      if (phone) {
          const results = await Customer.find({ phone: { $regex: phone, $options: 'i' } }); 
          return res.json(results);
      }
      const allCustomers = await Customer.find({});
      res.json(allCustomers);
  } catch (error) {
      res.status(500).send({ message: 'Error searching customers', error });
  }
});

module.exports = router;
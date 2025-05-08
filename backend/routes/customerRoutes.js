const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const crypto = require('crypto');
const Customer = require('../models/Customer');
const { console } = require('inspector');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/imgs"));
  },
  filename: async (req, file, cb) => {
    try {
      // Bước 1: Kiểm tra nhanh bằng tên file
      const originalPath = path.join(__dirname, "../public/imgs", file.originalname);
      if (fs.existsSync(originalPath)) {
        return cb(null, file.originalname);
      }

      // Bước 2: Nếu không trùng tên, kiểm tra bằng hash
      const fileBuffer = await fs.readFile(file.path);
      const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
      const files = await fs.readdir(path.join(__dirname, "../public/imgs"));
      
      for (const f of files) {
        const existingFileBuffer = await fs.readFile(path.join(__dirname, "../public/imgs", f));
        const existingHash = crypto.createHash('md5').update(existingFileBuffer).digest('hex');
        if (existingHash === hash) {
          return cb(null, f);
        }
      }

      // Nếu không tìm thấy file trùng
      const uniqueName = hash + path.extname(file.originalname);
      cb(null, uniqueName);
    } catch (err) {
      cb(err);
    }
  }
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
    try {
      const data = await Customer.find({});
      res.json(data);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching customers', error });
    }
});

// Lưu khách hàng
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const customerData = JSON.parse(req.body.customer);
    const serverURL = req.protocol + "://" + req.get("host");

    if (req.files && req.files.length > 0) {
      // Nếu có upload ảnh thì lấy ảnh đầu tiên
      const imagePath = `${serverURL}/imgs/${req.files[0].filename}`;
      customerData.img = imagePath;
    }
    // Nếu không upload ảnh => giữ nguyên để dùng default trong schema

    console.log("customerData", customerData);

    const customer = new Customer(customerData);
    await customer.save();

    res.status(201).json(customer);
  } catch (err) {
    console.error("Lỗi tạo khách hàng:", err);
    res.status(500).json({ error: "Không thể lưu khách hàng" });
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
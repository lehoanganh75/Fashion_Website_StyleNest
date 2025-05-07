const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const crypto = require('crypto');
const Product = require('../models/Product');

// Cấu hình Multer để lưu ảnh
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../public/imgs"));
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "_" + file.originalname;
//     cb(null, uniqueName);
//   }
// });

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

// Lấy danh sản phẩm
router.get('/', async (req, res) => {
    try {
      const data = await Product.find({});
      res.json(data);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching products', error });
    }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id: id });

    console.log("Product ID:", id); // Log ID để kiểm tra
    console.log("Product:", product); // Log sản phẩm để kiểm tra

    if (!product) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
});

// Lưu sản phẩm
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const productData = JSON.parse(req.body.product); // Nhận dữ liệu JSON

    const serverURL = req.protocol + "://" + req.get("host"); // => http://localhost:5000

    const imagePaths = req.files.map(file => `${serverURL}/imgs/${file.filename}`);

    productData.thumbnails = imagePaths;

    const product = new Product(productData);
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error("Lỗi tạo sản phẩm:", err);
    res.status(500).json({ error: "Không thể lưu sản phẩm" });
  }
});

// Cập nhật sản phẩm
router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
      const { id } = req.params;
      const productData = JSON.parse(req.body.product);  // Parse chuỗi JSON thành đối tượng

      // Kiểm tra và log thông tin thumbnails
      console.log("Thumbnails:", productData.thumbnails);

      // Kiểm tra ảnh và gửi thông báo lỗi nếu có vấn đề
      if (req.files && req.files.length > 0) {
          // Tạo đường dẫn đầy đủ cho các ảnh mới
          const imagePaths = req.files.map(file => `${req.protocol}://${req.get("host")}/imgs/${file.filename}`);

          // Nếu productData.thumbnails đã có, kết hợp với ảnh mới
          if (Array.isArray(productData.thumbnails)) {
              productData.thumbnails = [...productData.thumbnails, ...imagePaths];
          } else {
              productData.thumbnails = imagePaths;  // Nếu không có ảnh cũ, chỉ lấy ảnh mới
          }

          console.log("Update Thumbnails:", productData.thumbnails);
      }

      // Cập nhật sản phẩm
      const product = await Product.findOneAndUpdate(
          { id: id },
          productData,
          { new: true }
      );

      if (!product) {
          return res.status(404).json({ error: "Sản phẩm không tồn tại" });
      }

      res.status(200).json(product);
  } catch (err) {
      console.error("Lỗi cập nhật sản phẩm:", err);
      res.status(500).json({ error: `Không thể cập nhật sản phẩm. Chi tiết lỗi: ${err.message}` });
  }
});

router.put("/update-stock/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { instock } = req.body;

    const product = await Product.findOneAndUpdate(
      { id: id },
      { instock: instock },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Sản phẩm không tồn tại" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Lỗi cập nhật sản phẩm:", err);
    res.status(500).json({ error: `Không thể cập nhật sản phẩm. Chi tiết lỗi: ${err.message}` });
  }
});


// Xóa sản phẩm
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Xóa sản phẩm theo id (dùng id hoặc _id tùy theo thiết kế)
    const deletedProduct = await Product.findOneAndDelete({ id: id });

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Lấy tất cả sản phẩm hiện có
    let products = await Product.find();

    // Tạo các yêu cầu cập nhật cho mỗi sản phẩm
    const bulkOps = products.map((product, index) => ({
      updateOne: {
        filter: { _id: product._id }, // Tìm sản phẩm theo _id
        update: { $set: { id: (index + 1).toString() } }, // Cập nhật id
      },
    }));

    // Sử dụng bulkWrite để cập nhật nhiều sản phẩm cùng lúc
    await Product.bulkWrite(bulkOps);
    
    // Sau khi cập nhật lại id, sắp xếp lại các tài khoản theo id
    products = await Product.find().sort({ id: 1 });

    res.status(200).json({ message: 'Product deleted and IDs updated successfully', deletedProduct });
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm (server):", error);
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm (server)", error });
  }
});

router.get('/search', async (req, res) => {
  try {
      const { name } = req.query; 
      
      if (!name) {
          return res.status(400).json({ message: 'Tên sản phẩm không được bỏ trống' });
      }

      const products = await Product.find({
          name: { $regex: name, $options: 'i' }
      });

      if (products.length === 0) {
          return res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
      }
      res.status(200).json(products);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm kiếm sản phẩm' });
  }
});


module.exports = router;
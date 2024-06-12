const express = require('express');
const UpscaleController = require('../app/controllers/UpscaleController');
const upscaleRouter = express.Router();

const fs = require('fs')
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const path_to_src = path.join(__dirname, '..')
const path_to_input = path.join(path_to_src, 'ESRGAN', 'input');

// Định nghĩa hàm tùy chỉnh để xác định tên thư mục lưu trữ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Tạo tên thư mục ngẫu nhiên
    const uploadPath = `${path_to_input}/${uuidv4()}`;
    fs.mkdir(uploadPath, (err) => {
        if (err) {
          console.error('Đã xảy ra lỗi khi tạo thư mục:', err);
          return;
        }
        console.log('Thư mục mới đã được tạo:', uploadPath);
      });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

upscaleRouter.post('/', upload.any(), (req, res) => {
    const uploadPaths = req.files.map(file => file.destination);
    UpscaleController.upscale(req, res, uploadPaths);
  });  

module.exports = upscaleRouter;

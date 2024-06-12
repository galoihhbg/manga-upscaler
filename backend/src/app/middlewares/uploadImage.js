const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const path_to_src = path.join(__dirname, '..', '..')
const path_to_input = path.join(path_to_src, 'ESRGAN', 'input');

// Định nghĩa hàm tùy chỉnh để xác định tên thư mục lưu trữ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Tạo tên thư mục ngẫu nhiên
    const uploadPath = `${path_to_input}/${uuidv4()}`;
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

exports.uploadImage = upload.any();
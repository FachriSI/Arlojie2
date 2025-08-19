const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Simpan file di folder 'uploads/products'
    cb(null, 'uploads/products');
  },
  filename: function (req, file, cb) {
    // Beri nama file unik agar tidak terjadi duplikasi
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Filter file untuk hanya menerima gambar PNG/JPG/JPEG
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Jenis file tidak didukung. Harap upload file PNG, JPG, atau JPEG.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Batasan ukuran file 5MB
});

module.exports = upload;
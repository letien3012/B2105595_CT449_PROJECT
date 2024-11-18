const express = require("express");
const sach = require("../controllers/sach.controller");
const multer = require('multer');
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Thư mục lưu file
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Tạo tên file duy nhất
  },
});
const upload = multer({ storage });
console.log(upload.single('image'));
router
  .route("/")
  .get(sach.findAll)
  .post(upload.single('image'), sach.create)
  .delete(sach.deleteAll);

// router.route("/favorite").get(contacts.findAllFavorite);

router
  .route("/:id")
  .get(sach.findOne)
  .put(upload.single('image'),sach.update)
  .delete(sach.delete);

module.exports = router;
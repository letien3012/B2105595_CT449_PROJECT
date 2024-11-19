// const { Double } = require("mongodb");
const ApiError = require("../api-error");
const SachService = require("../services/sach.service");
const MongoDB = require("../utils/mongodb.util");
const fs = require('fs');
const path = require('path');
const getNextSequenceValue = async (sequenceName) => {
  const db = MongoDB.client.db(); 
  const sequenceDocument = await db.collection('counters').findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { returnDocument: 'after', upsert: true }
  );
  return sequenceDocument.sequence_value;
};
exports.create = async (req, res, next) => {
  const bookData = JSON.parse(req.body.bookData); 
  const { TenSach, DonGia, SoQuyen, NamXuatBan, tacGia } = bookData;

  if (!TenSach) {
    return next(new ApiError(400, "Tên sách không được trống"));
  }

  if (typeof DonGia !== 'number' || DonGia <= 0) {
    return next(new ApiError(400, "Đơn giá phải là số dương"));
  }

  if (typeof SoQuyen !== 'number' || !Number.isInteger(SoQuyen) || SoQuyen <= 0) {
    return next(new ApiError(400, "Số quyền phải là số nguyên dương"));
  }

  if (!NamXuatBan || isNaN(Date.parse(NamXuatBan))) {
    return next(new ApiError(400, "Năm xuất bản không hợp lệ"));
  }

  if (!tacGia) {
    return next(new ApiError(400, "Tên tác giả không được trống"));
  }

  // Kiểm tra xem có file hình ảnh hay không
  const imageFile = req.file;
  if (!imageFile) {
    return next(new ApiError(400, "Vui lòng tải lên hình ảnh bìa"));
  }

  try {
    const sachService = new SachService(MongoDB.client);
    
    bookData.MaSach = await getNextSequenceValue('MaSach');
    bookData.imagePath = imageFile.path; // Lưu đường dẫn hình ảnh vào req.body
    const document = await sachService.create(bookData);
    return res.status(201).send(document); 
  } catch (error) {  
    console.error("Error creating book:", error);
    return next(new ApiError(500, "Lỗi khi thêm sách"));
  }
};
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const sachService = new SachService(MongoDB.client);
    const { tenNXB } = req.query;
    if (tenNXB) {
      documents = await sachService.findByName(tenNXB);
    } else {
      documents = await sachService.find({});
    }
  } catch (error ) {
    return next(
      new ApiError(500, "Lỗi khi tìm tất cả sách")
    );
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const sachService = new SachService(MongoDB.client);
    const document = await sachService.findById(req.params.id);
    if (!document){
      return next(new ApiError(404, "Không tìm thấy sách"));
    }
    return res.send(document);
  } catch (error){
    return next(
      new ApiError(500, `Không tìm thấy sách có mã sách =${req.params.id}`)
    );
  }
};

// exports.update = async (req, res, next) => {
//   // if (Object.keys(req.body).length === 0){
//   //   return next(new ApiError(400, "Dữ liệu cập nhật sách không tìm thấy"));
//   // }

//   try {
//     const sachService = new SachService(MongoDB.client);
//     const bookData = JSON.parse(req.body.bookData); 
//     if (req.file) {
//       bookData.imagePath = req.file.path;
//     }
//     const document = await sachService.update(req.params.id, bookData);
//     if (!document){
//       return next(new ApiError(404, "Không tìm thấy sách"));
//     }
//     return res.send({ message: "Cập nhật thông tin sách thành công"});
//   } catch (error) {
//     return next(new ApiError(500, `Lỗi khi cập nhật sách có id=${req.params.id}`));
//   }
// };
exports.update = async (req, res, next) => {
  try {
    const sachService = new SachService(MongoDB.client);
    
    const existingBook = await sachService.findById(req.params.id);
    if (!existingBook) {
      return next(new ApiError(404, "Không tìm thấy sách"));
    }
    const bookData = JSON.parse(req.body.bookData);
    if (req.file) {
      if (existingBook.imagePath) {
        const oldImagePath = path.join(__dirname, '../../', existingBook.imagePath);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Lỗi khi xóa hình ảnh cũ:", err);
          }
        });
      }
      bookData.imagePath = req.file.path; // Cập nhật đường dẫn hình ảnh mới
    }

    const document = await sachService.update(req.params.id, bookData);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy sách"));
    }
    
    return res.send({ message: "Cập nhật thông tin sách thành công" });
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi cập nhật sách có id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const sachService = new SachService(MongoDB.client);
    
    const document = await sachService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy sách"));
    }
    // console.log(document);
    // Xóa hình ảnh nếu có
    if (document.imagePath) {
      const imagePath = path.join(__dirname, '../../',document.imagePath); 
      console.log(imagePath);// Đường dẫn đến hình ảnh
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Lỗi khi xóa hình ảnh:", err);
        }
      });
    }

    await sachService.delete(req.params.id);
    return res.send({ message: "Xóa sách thành công" });
  } catch (error) {
    return next(new ApiError(500, `Không thể xóa sách id=${req.params.id}`));
  }
};
exports.deleteAll = async (req, res, next) => {
  try {
    const sachService = new SachService(MongoDB.client);
    
    // Lấy tất cả sách để xóa hình ảnh
    const allBooks = await sachService.find({});
    
    // Xóa hình ảnh cho từng sách
    allBooks.forEach(book => {
      if (book.imagePath) {
        const imagePath = path.join(__dirname, '../../', book.imagePath); 
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Lỗi khi xóa hình ảnh:", err);
          }
        });
      }
    });

    // Xóa tất cả sách
    const deletedCount = await sachService.deleteAll();
    return res.send({ message: `Xóa thành công ${deletedCount} sách` });
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi xóa tất cả sách"));
  }
};


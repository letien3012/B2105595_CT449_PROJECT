const ApiError = require("../api-error");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config/index");
const NhanVienService = require("../services/nhanvien.service");
const MongoDB = require("../utils/mongodb.util");

// exports.create = async (req, res, next) => {
//   if (!req.body?.MSNV) {
//     return next(new ApiError(400, "Mã nhân viên bản không được trống"));
//   }

//   try {
//     const nhanVienService = new NhanVienService(MongoDB.client);
//     const document = await nhanVienService.create(req.body);
//     return res.send(document);
//   } catch (error){
//     return next(
//       new ApiError(500, "Lỗi khi thêm nhân viên")
//     );
//   }
// };
const createToken = (nhanVien) => {
  const payload = {
      MSNV: nhanVien.MSNV,
      // Bạn có thể thêm thông tin khác vào payload nếu cần
  };

  const token = jwt.sign(payload, config.app.jwt_secret);
  return token;
};
exports.login = async (req, res, next) => {
  const { MSNV, Password } = req.body;
  if (!MSNV || !Password) {
      return next(new ApiError(400, "Mã nhân viên và mật khẩu không được trống"));
  }
  try {
      const nhanVienService = new NhanVienService(MongoDB.client);
      const nhanVien = await nhanVienService.findByCredentials(MSNV, Password);
      if (!nhanVien) {
          return next(new ApiError(401, "Mã nhân viên hoặc mật khẩu không đúng"));
      }

      // Nếu bạn sử dụng JWT, bạn có thể tạo token ở đây
      const token = createToken(nhanVien); // Hàm tạo token của bạn
      return res.send({
          success: true,
          message: "Đăng nhập thành công",
          token: token, // Trả về token nếu cần
          nhanVien: {
              MSNV: nhanVien.MSNV,
              ten: nhanVien.ten,
          }
      });
  } catch (error) {
    console.log(error);
      return next(new ApiError(500, "Lỗi khi đăng nhập"));
  }
};
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const { tenNXB } = req.query;
    if (tenNXB) {
      documents = await nhanVienService.findByName(tenNXB);
    } else {
      documents = await nhanVienService.find({});
    }
  } catch (error ) {
    return next(
      new ApiError(500, "Lỗi khi tìm tất cả nhân viên")
    );
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const document = await nhanVienService.findById(req.params.id);
    if (!document){
      return next(new ApiError(404, "Không tìm thấy nhân viên"));
    }
    return res.send(document);
  } catch (error){
    return next(
      new ApiError(500, `Không tìm thấy nhân viên có id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0){
    return next(new ApiError(400, "Dữ liệu cập nhật nhân viên không tìm thấy"));
  }

  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const document = await nhanVienService.update(req.params.id, req.body);
    if (!document){
      return next(new ApiError(404, "Không tìm thấy nhân viên"));
    }
    return res.send({ message: "Cập nhật thông tin nhân viên thành công"});
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi cập nhật nhân viên có id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const document = await nhanVienService.delete(req.params.id);
    if (!document){
      return next(new ApiError(404, "Không tìm thấy nhân viên"));
    }
    return res.send({ message: "Xóa nhân viên thành công"});
  } catch (error) {
    return next(new ApiError(500, `Không thể xóa nhân viên id=${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const deletedCount = await nhanVienService.deleteAll();
    return res.send({ message: `Xóa thành công ${deletedCount} nhân viên`});
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi xóa tất cả nhân viên"));
  }
};


const ApiError = require("../api-error");
const TheoDoiMuonSachService = require("../services/theodoimuonsach.service"); // Adjusted import
const MongoDB = require("../utils/mongodb.util");


exports.create = async (req, res, next) => {
  const { MaSach, MaDocGia, NgayMuon, NgayTra } = req.body;

  if (!MaSach) {
    return next(new ApiError(400, "Mã sách không được trống"));
  }

  if (!MaDocGia) {
    return next(new ApiError(400, "Mã độc giả không được trống"));
  }

  if (!NgayMuon || isNaN(Date.parse(NgayMuon))) {
    return next(new ApiError(400, "Ngày mượn không hợp lệ"));
  }

  if (!NgayTra || isNaN(Date.parse(NgayTra))) {
    return next(new ApiError(400, "Ngày trả không hợp lệ"));
  }

  try {
    const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
    
    const document = await theoDoiMuonSachService.create(req.body);
    return res.status(201).send(document); 
  } catch (error) {  
    console.error("Error creating loan tracking record:", error);
    return next(new ApiError(500, "Lỗi khi thêm theo dõi mượn sách"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
    const { MaDocGia } = req.query; // Assuming you might want to filter by MaDocGia
    if (MaDocGia) {
      documents = await theoDoiMuonSachService.findByMaDocGia(MaDocGia);
    } else {
      documents = await theoDoiMuonSachService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi tìm tất cả theo dõi mượn sách"));
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
    const document = await theoDoiMuonSachService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy theo dõi mượn sách"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Không tìm thấy theo dõi mượn sách có id=${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật theo dõi mượn sách không tìm thấy"));
  }

  try {
    const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
    const document = await theoDoiMuonSachService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy theo dõi mượn sách"));
    }
    return res.send({ message: "Cập nhật thông tin theo dõi mượn sách thành công" });
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi cập nhật theo dõi mượn sách có id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
    const document = await theoDoiMuonSachService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy theo dõi mượn sách"));
    }
    return res.send({ message: "Xóa theo dõi mượn sách thành công" });
  } catch (error) {
    return next(new ApiError(500, `Không thể xóa theo dõi mượn sách id=${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const theoDoiMuonSachService = new TheoDoiMuonSachService(MongoDB.client);
    const deletedCount = await theoDoiMuonSachService.deleteAll();
    return res.send({ message: `Xóa thành công ${deletedCount} theo dõi mượn sách` });
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi xóa tất cả theo dõi mượn sách"));
  }
};
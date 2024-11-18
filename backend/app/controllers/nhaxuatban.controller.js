const ApiError = require("../api-error");
const NhaXuatBanService = require("../services/nhaxuatban.service");
const MongoDB = require("../utils/mongodb.util");
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
  if (!req.body.tenNXB) {
    return next(new ApiError(400, "Tên nhà xuất bản không được trống"));
  }
  if (!req.body.diachiNXB) {
    return next(new ApiError(400, "Địa chỉ nhà xuất bản không được trống"));
  }

  try {
    const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
    req.body.maNXB = await getNextSequenceValue('maNXB');
    const document = await nhaXuatBanService.create(req.body);
    return res.send(document);
  } catch (error){
    return next(
      new ApiError(500, "Lỗi khi thêm nhà xuất bản")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
    const { tenNXB } = req.query;
    if (tenNXB) {
      documents = await nhaXuatBanService.findByName(tenNXB);
    } else {
      documents = await nhaXuatBanService.find({});
    }
  } catch (error ) {
    return next(
      new ApiError(500, "Lỗi khi tìm tất cả nhà xuất bản")
    );
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
    const document = await nhaXuatBanService.findByMaNXB(req.params.maNXB);
    if (!document){
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
    }
    return res.send(document);
  } catch (error){
    return next(
      new ApiError(500, `Không tìm thấy nhà xuất bản có id=${req.params.maNXB}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0){
    return next(new ApiError(400, "Dữ liệu cập nhật nhà xuất bản không tìm thấy"));
  }

  try {
    const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
    const document = await nhaXuatBanService.update(req.params.id, req.body);
    if (!document){
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
    }
    return res.send({ message: "Cập nhật thông tin nhà xuất bản thành công"});
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi cập nhật nhà xuất bản có id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
    const document = await nhaXuatBanService.delete(req.params.id);
    if (!document){
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
    }
    return res.send({ message: "Xóa nhà xuất bản thành công"});
  } catch (error) {
    return next(new ApiError(500, `Không thể xóa nhà xuất bản id=${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
    const deletedCount = await nhaXuatBanService.deleteAll();
    return res.send({ message: `Xóa thành công ${deletedCount} nhà xuất bản`});
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi xóa tất cả nhà xuất bản"));
  }
};


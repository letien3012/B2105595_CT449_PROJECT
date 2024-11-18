const ApiError = require("../api-error");
const DocGiaService = require("../services/docgia.service");
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
  const readerData = req.body; 
  const { HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai } = readerData;
  if (!HoLot) {
    return next(new ApiError(400, "Họ lót không được trống"));
  }
  if (!Ten) {
    return next(new ApiError(400, "Tên không được trống"));
  }
  if (!NgaySinh) {
    return next(new ApiError(400, "Ngày sinh không được trống"));
  }
  if (!Phai) {
    return next(new ApiError(400, "Phái không được trống"));
  }
  if (!DiaChi) {
    return next(new ApiError(400, "Địa chỉ không được trống"));
  }
  if (!DienThoai) {
    return next(new ApiError(400, "Điện thoại không được trống"));
  }

  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    req.body.MaDocGia = await getNextSequenceValue('MaDocGia');
    const document = await docGiaService.create(req.body);
    return res.send(document);
  } catch (error){
    return next(
      new ApiError(500, "Lỗi khi thêm độc giả")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const { tenNXB } = req.query;
    if (tenNXB) {
      documents = await docGiaService.findByName(tenNXB);
    } else {
      documents = await docGiaService.find({});
    }
  } catch (error ) {
    return next(
      new ApiError(500, "Lỗi khi tìm tất cả độc giả")
    );
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const document = await docGiaService.findById(req.params.id);
    if (!document){
      return next(new ApiError(404, "Không tìm thấy độc giả"));
    }
    return res.send(document);
  } catch (error){
    return next(
      new ApiError(500, `Không tìm thấy độc giả có id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0){
    return next(new ApiError(400, "Dữ liệu cập nhật độc giả không tìm thấy"));
  }

  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const document = await docGiaService.update(req.params.id, req.body);
    if (!document){
      return next(new ApiError(404, "Không tìm thấy độc giả"));
    }
    return res.send({ message: "Cập nhật thông tin độc giả thành công"});
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi cập nhật độc giả có id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const document = await docGiaService.delete(req.params.id);
    if (!document){
      return next(new ApiError(404, "Không tìm thấy độc giả"));
    }
    return res.send({ message: "Xóa độc giả thành công"});
  } catch (error) {
    return next(new ApiError(500, `Không thể xóa độc giả id=${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const deletedCount = await docGiaService.deleteAll();
    return res.send({ message: `Xóa thành công ${deletedCount} độc giả`});
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi xóa tất cả độc giả"));
  }
};


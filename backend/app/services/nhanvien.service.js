const { ObjectId } = require("mongodb");

class NhanVienService {
    constructor(client){
        this.NhanVien = client.db().collection("nhanvien");
    }

    extractNhanVienData(payload) {
        const NhanVien = {
            MSNV: maNhanVien,
            HoTenNV: payload.HoTenNV,
            Password: payload.Password,
            ChucVu: payload.ChucVu,
            DiaChi: payload.DiaChi,
            SoDienThoai: payload.SoDienThoai,
        };
        Object.keys(NhanVien).forEach(
            (key) => NhanVien[key] === undefined && delete NhanVien[key]
        );
        return NhanVien;
    }

    async create(payload){
        const NhanVien = this.extractNhanVienData(payload);
        const result = await this.NhanVien.insertOne(NhanVien);
        return result;
    }
    async findByCredentials(MSNV, Password) {
        const nhanVien = await this.NhanVien.findOne({ MSNV: MSNV, Password: Password}); 
        return nhanVien;
    }
    async find(filter) {
        const cursor = await this.NhanVien.find(filter);
        return await cursor.toArray();
    }

    async findByName(HoTenNV) {
        return await this.find({
            HoTenNV: { $regex: new RegExp(HoTenNV), $options: "i" },
        });
    }

    async findById(id) {
        return await this.NhanVien.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractNhanVienData(payload);
        const result = await this.NhanVien.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"}
        );
        return result;
    }

    async delete(id) {
        const result = await this.NhanVien.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.NhanVien.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = NhanVienService;
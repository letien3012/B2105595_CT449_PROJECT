const { ObjectId } = require("mongodb");

class DocGiaService {
    constructor(client){
        this.DocGia = client.db().collection("docgia");
    }

    extractDocGiaData(payload) {
        const DocGia = {
            MaDocGia: `ĐG${payload.MaDocGia}`,
            HoLot: payload.HoLot,
            Ten: payload.Ten,
            NgaySinh: payload.NgaySinh,
            Phai: payload.Phai,
            DiaChi: payload.DiaChi,
            DienThoai: payload.DienThoai,
        };
        Object.keys(DocGia).forEach(
            (key) => DocGia[key] === undefined && delete DocGia[key]
        );
        return DocGia;
    }

    async create(payload){
        const DocGia = this.extractDocGiaData(payload);
        const result = await this.DocGia.insertOne(DocGia);
        return result;
    }

    async find(filter) {
        const cursor = await this.DocGia.find(filter);
        return await cursor.toArray();
    }

    async findByName(TenDocGia) {
        return await this.find({
            TenDocGia: { $regex: new RegExp(new RegExp(TenDocGia)), $options: "i" },
        });
    }

    async findById(id) {
        return await this.DocGia.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractDocGiaData(payload);
        delete update.MaDocGia;
        const result = await this.DocGia.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"}
        );
        return result;
    }

    async delete(id) {
        const result = await this.DocGia.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.DocGia.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = DocGiaService;
const { ObjectId } = require("mongodb");

class SachService {
    constructor(client){
        this.Sach = client.db().collection("sach");
    }
    
    extractSachData(payload) {
        const Sach = {
            MaSach: `S${payload.MaSach}`, 
            TenSach: payload.TenSach,
            DonGia: payload.DonGia,
            SoQuyen: payload.SoQuyen,
            NamXuatBan: payload.NamXuatBan,
            maNXB: payload.maNXB,
            tacGia: payload.tacGia,
            imagePath: payload.imagePath
        };
        Object.keys(Sach).forEach(
            (key) => Sach[key] === undefined && delete Sach[key]
        );
        return Sach;
    }

    async create(payload){
        const Sach = this.extractSachData(payload);
        const result = await this.Sach.insertOne(Sach);
        return result;
    }

    async find(filter) {
        const cursor = await this.Sach.find(filter);
        return await cursor.toArray();
    }

    async findByName(TenSach) {
        return await this.find({
            TenSach: { $regex: new RegExp(new RegExp(TenSach)), $options: "i" },
        });
    }

    async findById(MaSach) {
        return await this.Sach.findOne({
            MaSach: MaSach ? MaSach : null,
        });
    }

    async update(MaSach, payload) {
        const filter = {
            MaSach: MaSach ? MaSach : null,
        };
        const update = this.extractSachData(payload);
        delete update.MaSach;
        const result = await this.Sach.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"}
        );
        return result;
    }

    async delete(id) {
        const result = await this.Sach.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Sach.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = SachService;
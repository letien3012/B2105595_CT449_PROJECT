const { ObjectId } = require("mongodb");

class NhaXuatBanService {
    constructor(client){
        this.NhaXuatBan = client.db().collection("nhaxuatban");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractNhaXuatBanData(payload) {
        const NhaXuatBan = {
            maNXB: `NXB${payload.maNXB}`,
            tenNXB: payload.tenNXB,
            diachiNXB: payload.diachiNXB,
        };
        Object.keys(NhaXuatBan).forEach(
            (key) => NhaXuatBan[key] === undefined && delete NhaXuatBan[key]
        );
        return NhaXuatBan;
    }

    async create(payload){
        const NhaXuatBan = this.extractNhaXuatBanData(payload);
        const result = await this.NhaXuatBan.insertOne(NhaXuatBan);
        return result;
    }

    async find(filter) {
        const cursor = await this.NhaXuatBan.find(filter);
        return await cursor.toArray();
    }

    async findByName(tenNXB) {
        return await this.find({
            tenNXB: { $regex: new RegExp(new RegExp(tenNXB)), $options: "i" },
        });
    }

    async findByMaNXB(maNXB) {
        return await this.NhaXuatBan.findOne({
            maNXB: maNXB ? maNXB : null,
        });
    }
    
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractNhaXuatBanData(payload);
        delete update.maNXB;
        const result = await this.NhaXuatBan.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"}
        );
        return result;
    }

    async delete(id) {
        const result = await this.NhaXuatBan.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.NhaXuatBan.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = NhaXuatBanService;
const { ObjectId } = require("mongodb");

class TheoDoiMuonSachService {
    constructor(client) {
        this.TheoDoiMuonSach = client.db().collection("theodoimuonsach"); 
    }
    
    extractTheoDoiMuonSachData(payload) {
        const theoDoiMuonSach = {
            MaSach: payload.MaSach, 
            MaDocGia: payload.MaDocGia,
            NgayMuon: payload.NgayMuon,
            NgayTra: payload.NgayTra,
            TrangThai: payload.TrangThai
        };
        Object.keys(theoDoiMuonSach).forEach(
            (key) => theoDoiMuonSach[key] === undefined && delete theoDoiMuonSach[key]
        );
        return theoDoiMuonSach;
    }

    async create(payload) {
        const theoDoiMuonSach = this.extractTheoDoiMuonSachData(payload);
        const result = await this.TheoDoiMuonSach.insertOne(theoDoiMuonSach);
        return result;
    }

    async find(filter) {
        const cursor = await this.TheoDoiMuonSach.find(filter);
        return await cursor.toArray();
    }

    async findByMaSach(MaSach) {
        return await this.find({
            MaSach: { $regex: new RegExp(MaSach), $options: "i" },
        });
    }

    async findByMaDocGia(MaDocGia) {
        return await this.find({
            MaDocGia: { $regex: new RegExp(MaDocGia), $options: "i" },
        });
    }

    async findById(id) {
        return await this.TheoDoiMuonSach.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractTheoDoiMuonSachData(payload);
        const result = await this.TheoDoiMuonSach.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.TheoDoiMuonSach.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.TheoDoiMuonSach.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = TheoDoiMuonSachService;
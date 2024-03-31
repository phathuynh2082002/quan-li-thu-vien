const { ObjectId } = require("mongodb");

class MuonSachService {
  constructor(client) {
    this.MuonSach = client.db().collection("muonSach");
  }

  extractMuonSachData(payload) {
    const muonSach = {
      maNhanVien: payload.maNhanVien,
      maDocGia: payload.maDocGia,
      maSach: payload.maSach,
      ngayMuon: payload.ngayMuon,
      ngayTra: payload.ngayTra,
      pheDuyet: payload.pheDuyet || false,
    };

    Object.keys(muonSach).forEach(
      (key) => muonSach[key] === undefined && delete muonSach[key]
    );
    return muonSach;
  }

  async create(payload) {
    const muonSach = this.extractMuonSachData(payload);
    const result = await this.MuonSach.insertOne(muonSach);
    return result;
  }

  async find(filter) {
    const cursor = await this.MuonSach.find(filter);
    return await cursor.toArray();
  }

  async findById(id) {
    return await this.MuonSach.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, maNhanVien) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      $set: {
        maNhanVien: maNhanVien,
        pheDuyet: true
      }
    };
    const options = {
      returnDocument: "after"
    };
    const result = await this.MuonSach.findOneAndUpdate(filter, update, options);
    return result;
  }
  

  async delete(id) {
    const result = await this.MuonSach.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async deleteAll() {
    const result = await this.MuonSach.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = MuonSachService;

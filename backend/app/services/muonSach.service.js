const { ObjectId } = require("mongodb");

class MuonSachService {
  constructor(client) {
    this.MuonSach = client.db().collection("muonSach");
    this.Sach = client.db().collection("sach");
  }

  extractMuonSachData(payload) {
    const muonSach = {
      maNhanVien: payload.maNhanVien,
      maDocGia: payload.maDocGia,
      maSach: payload.maSach,
      ngayMuon: payload.ngayMuon,
      ngayTra: payload.ngayTra,
      trangThai: payload.trangThai || 'choPheDuyet',
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

  async update(id, maNhanVien, trangThai) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
  
    let update = {
      $set: {
        maNhanVien: maNhanVien,
        trangThai: trangThai
      }
    };
  
    // Kiểm tra nếu trạng thái là 'daMuon' hoặc 'daTra'
    if (trangThai === 'daMuon' || trangThai === 'daTra') {
      // Lấy thông tin sách từ mượn sách
      const muonSach = await this.MuonSach.findOne(filter._id);
      const sachFilter = {
        _id: ObjectId.isValid(muonSach.maSach) ? new ObjectId(muonSach.maSach) : null
      };
      const Sach = await this.Sach.findOne(sachFilter._id);
      const sachData = {
        soQuyen: trangThai === 'daMuon' ? -1 : +1
      };
      const updateSach = {
        $inc: sachData
      };
      
      // Cập nhật thông tin sách
      await this.Sach.findOneAndUpdate(sachFilter, updateSach);
    }
  
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

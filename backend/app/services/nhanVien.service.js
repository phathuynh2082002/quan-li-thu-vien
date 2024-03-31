const { ObjectId } = require("mongodb");

class NhanVienService {
  constructor(client) {
    this.NhanVien = client.db().collection("nhanVien");
  }

  extractNhanVienData(payload) {
    const nhanVien = {
      hoTenNV: payload.hoTenNV,
      password: payload.password,
      chucVu: payload.chucVu,
      diaChi: payload.diaChi,
      soDienThoai: payload.soDienThoai,
    };

    Object.keys(nhanVien).forEach(
      (key) => nhanVien[key] === undefined && delete nhanVien[key]
    );
    return nhanVien;
  }

  async create(payload) {
    const nhanVien = this.extractNhanVienData(payload);
    const result = await this.NhanVien.findOneAndUpdate(
      nhanVien,
      { $set: {} }, // Trống vì không có trường nào cần cập nhật khi tạo mới
      { returnDocument: "after", upsert: true }
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.NhanVien.find(filter);
    return await cursor.toArray();
  }

  async login(soDienThoai, password) {
    const filter = {
      soDienThoai: soDienThoai,
      password: password,
    };
    const nhanVien = await this.NhanVien.findOne(filter);
    return nhanVien?._id;
  }

  async findByHoTenNV(hoTenNV) {
    return await this.find({
      hoTenNV: { $regex: new RegExp(hoTenNV), $options: "i" },
    });
  }

  async findBySoDienThoai(soDienThoai) {
    return await this.NhanVien.findOne({ soDienThoai: soDienThoai });
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
      { $set: update },
      { returnDocument: "after" }
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

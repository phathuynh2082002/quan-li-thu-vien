const { ObjectId } = require("mongodb");

class DocGiaService {
  constructor(client) {
    this.DocGia = client.db().collection("docGia");
  }

  extractDocGiaData(payload) {
    const docGia = {
      hoLot: payload.hoLot,
      ten: payload.ten,
      ngaySinh: payload.ngaySinh,
      phai: payload.phai,
      diaChi: payload.diaChi,
      dienThoai: payload.dienThoai,
      password: payload.password,
    };

    Object.keys(docGia).forEach(
      (key) => docGia[key] === undefined && delete docGia[key]
    );
    return docGia;
  }

  async create(payload) {
    const docGia = this.extractDocGiaData(payload);
    const result = await this.DocGia.findOneAndUpdate(
      docGia,
      { $set: {} }, // Trống vì không có trường nào cần cập nhật khi tạo mới
      { returnDocument: "after", upsert: true }
    );
    return result;
  }

  async login(dienThoai, password) {
    const filter = {
      dienThoai: dienThoai,
      password: password,
    };
    const docGia = await this.DocGia.findOne(filter);
    return docGia._id;
  }

  async find(filter) {
    const cursor = await this.DocGia.find(filter);
    return await cursor.toArray();
  }

  async findByHoTen(hoTen) {
    const regex = new RegExp(hoTen, "i");
    return await this.find({
      $or: [{ hoLot: { $regex: regex } }, { ten: { $regex: regex } }],
    });
  }

  async findByDienThoai(dienThoai) {
    return await this.DocGia.findOne({ dienThoai: dienThoai });
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
    const result = await this.DocGia.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
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

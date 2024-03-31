const ApiError = require("../api-error");
const NhanVienService = require("../services/nhanVien.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
  if (!req.body?.hoTenNV || !req.body?.chucVu) {
    return next(new ApiError(400, "Họ tên và chức vụ không được để trống"));
  }

  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const existingNhanVien = await nhanVienService.findBySoDienThoai(req.body.soDienThoai);
    if (existingNhanVien) {
      return next(new ApiError(400, "Số điện thoại đã tồn tại"));
    }
    const document = await nhanVienService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi tạo nhân viên")
    );
  }
};

exports.login = async (req, res, next) => {
  const { soDienThoai, password } = req.body;
  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const nhanVien = await nhanVienService.login(soDienThoai, password);
    if (!nhanVien) {
      return next(new ApiError(401, "Số điện thoại hoặc mật khẩu không chính xác."));
    }

    return res.json({ nhanVien });
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi đăng nhập"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const { hoTenNV } = req.query;
    if (hoTenNV) {
      documents = await nhanVienService.findByHoTenNV(hoTenNV);
    } else {
      documents = await nhanVienService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi lấy danh sách nhân viên")
    );
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const document = await nhanVienService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhân viên"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Đã xảy ra lỗi khi lấy nhân viên với id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
  }

  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const document = await nhanVienService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhân viên"));
    }
    return res.send({ message: "Nhân viên đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Đã xảy ra lỗi khi cập nhật nhân viên với id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const document = await nhanVienService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhân viên"));
    }
    return res.send({ message: "Nhân viên đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Đã xảy ra lỗi khi xóa nhân viên với id=${req.params.id}`)
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const deletedCount = await nhanVienService.deleteAll();
    return res.send({
      message: `${deletedCount} nhân viên đã được xóa thành công`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả nhân viên")
    );
  }
};

const ApiError = require("../api-error");
const NhaXuatBanService = require("../services/nhaXuatBan.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
  if (!req.body?.tenNXB) {
    return next(new ApiError(400, "Tên nhà xuất bản không được để trống"));
  }

  try {
    const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
    const document = await nhaXuatBanService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi tạo nhà xuất bản")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
    const { tenNXB } = req.query;
    if (tenNXB) {
      documents = await nhaXuatBanService.findByTenNXB(tenNXB);
    } else {
      documents = await nhaXuatBanService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi lấy danh sách nhà xuất bản")
    );
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
    const document = await nhaXuatBanService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Đã xảy ra lỗi khi lấy nhà xuất bản với id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
  }

  try {
    const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
    const document = await nhaXuatBanService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
    }
    return res.send({ message: "Nhà xuất bản đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Đã xảy ra lỗi khi cập nhật nhà xuất bản với id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
    const document = await nhaXuatBanService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
    }
    return res.send({ message: "Nhà xuất bản đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Đã xảy ra lỗi khi xóa nhà xuất bản với id=${req.params.id}`)
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
    const deletedCount = await nhaXuatBanService.deleteAll();
    return res.send({
      message: `${deletedCount} nhà xuất bản đã được xóa thành công`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả nhà xuất bản")
    );
  }
};

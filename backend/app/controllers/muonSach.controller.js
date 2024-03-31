const ApiError = require("../api-error");
const MuonSachService = require("../services/muonSach.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
  if (!req.body?.maDocGia || !req.body?.maSach) {
    return next(new ApiError(400, "Mã độc giả và mã sách không được để trống"));
  }

  try {
    const muonSachService = new MuonSachService(MongoDB.client);
    const document = await muonSachService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi mượn sách"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const muonSachService = new MuonSachService(MongoDB.client);
    documents = await muonSachService.find({});
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi lấy danh sách mượn sách"));
  }

  return res.send(documents);
};

exports.findByIdDocGia = async (req, res, next) => {
  let documents = [];
  const maDocGia = req.params.id;
  try {
    const muonSachService = new MuonSachService(MongoDB.client);
    documents = await muonSachService.find({maDocGia});
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi lấy danh sách mượn sách"));
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const muonSachService = new MuonSachService(MongoDB.client);
    const document = await muonSachService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy thông tin mượn sách"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Đã xảy ra lỗi khi lấy thông tin mượn sách với id=${req.params.id}`
      )
    );
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { maNhanVien } = req.body;
  if (!req.body?.maNhanVien) {
    return next(new ApiError(400, "Mã nhân viên không được để trống"));
  }

  try {
    const muonSachService = new MuonSachService(MongoDB.client);
    const document = await muonSachService.update(id, maNhanVien);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy thông tin mượn sách"));
    }
    return res.send({ message: "Mượn sách đã được phê duyệt thành công" });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Đã xảy ra lỗi khi phê duyệt thông tin mượn sách với id=${id}`
      )
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const muonSachService = new MuonSachService(MongoDB.client);
    const document = await muonSachService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy thông tin mượn sách"));
    }
    return res.send({ message: "Thông tin mượn sách đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Đã xảy ra lỗi khi xóa thông tin mượn sách với id=${req.params.id}`
      )
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const muonSachService = new MuonSachService(MongoDB.client);
    const deletedCount = await muonSachService.deleteAll();
    return res.send({
      message: `${deletedCount} thông tin mượn sách đã được xóa thành công`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả thông tin mượn sách")
    );
  }
};

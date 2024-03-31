const ApiError = require("../api-error");
const DocGiaService = require("../services/docGia.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
  if (!req.body?.hoLot || !req.body?.ten) {
    return next(new ApiError(400, "Họ và tên không được để trống"));
  }

  if (!req.body?.dienThoai || !req.body?.password) {
    return next(new ApiError(400, "Số điện thoại và password không được để trống"));
  }

  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const existingDocGia = await docGiaService.findByDienThoai(req.body.dienThoai);
    if (existingDocGia) {
      return next(new ApiError(400, "Số điện thoại đã tồn tại"));
    }
    const document = await docGiaService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi tạo độc giả")
    );
  }
};

exports.login = async (req, res, next) => {
  const { dienThoai, password } = req.body;

  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const docGia = await docGiaService.login(dienThoai, password);
    if (!docGia) {
      return next(new ApiError(401, "Số điện thoại hoặc mật khẩu không chính xác"));
    }

    return res.json({ docGia });
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi đăng nhập"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const { hoLot, ten } = req.query;
    if (hoLot || ten) {
      documents = await docGiaService.findByHoTen(`${hoLot} ${ten}`);
    } else {
      documents = await docGiaService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi lấy danh sách độc giả")
    );
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const document = await docGiaService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy độc giả"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Đã xảy ra lỗi khi lấy độc giả với id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
  }

  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const document = await docGiaService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy độc giả"));
    }
    return res.send({ message: "Độc giả đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Đã xảy ra lỗi khi cập nhật độc giả với id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const document = await docGiaService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy độc giả"));
    }
    return res.send({ message: "Độc giả đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Đã xảy ra lỗi khi xóa độc giả với id=${req.params.id}`)
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const deletedCount = await docGiaService.deleteAll();
    return res.send({
      message: `${deletedCount} độc giả đã được xóa thành công`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả độc giả")
    );
  }
};

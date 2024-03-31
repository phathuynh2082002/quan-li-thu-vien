const express = require("express");
const cors = require("cors");

const sachRouter = require("./app/routes/sach.route");
const docGiaRouter = require("./app/routes/docGia.route");
const nhanVienRouter = require("./app/routes/nhanVien.route");
const nhaXuatBanRouter = require("./app/routes/nhaXuatBan.route");
const muonSachRouter = require("./app/routes/muonSach.route");

const ApiError = require("./app/api-error");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/sach", sachRouter);
app.use("/api/docGia", docGiaRouter);
app.use("/api/nhanVien", nhanVienRouter);
app.use("/api/nhaXuatBan", nhaXuatBanRouter);
app.use("/api/muonSach", muonSachRouter);

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;

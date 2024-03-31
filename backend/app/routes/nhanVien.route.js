const express = require("express");
const nhanVienController = require("../controllers/nhanVien.controller");

const router = express.Router();

router
  .route("/login")
  .post(nhanVienController.login)
  
router
  .route("/")
  .get(nhanVienController.findAll)
  .post(nhanVienController.create)
  .delete(nhanVienController.deleteAll);

router
  .route("/:id")
  .get(nhanVienController.findOne)
  .put(nhanVienController.update)
  .delete(nhanVienController.delete);

module.exports = router;

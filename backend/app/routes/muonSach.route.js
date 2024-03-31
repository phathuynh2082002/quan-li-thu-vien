const express = require("express");
const muonSachController = require("../controllers/muonSach.controller");

const router = express.Router();
router
.route("/findByIdDocGia/:id")
.get(muonSachController.findByIdDocGia)

router
  .route("/")
  .get(muonSachController.findAll)
  .post(muonSachController.create)
  .delete(muonSachController.deleteAll);

router
  .route("/:id")
  .get(muonSachController.findOne)
  .put(muonSachController.update)
  .delete(muonSachController.delete);

module.exports = router;

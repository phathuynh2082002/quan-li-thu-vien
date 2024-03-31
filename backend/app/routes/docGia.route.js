const express = require("express");
const docGiaController = require("../controllers/docGia.controller");

const router = express.Router();

router
  .route("/login")
  .post(docGiaController.login)

router
  .route("/")
  .get(docGiaController.findAll)
  .post(docGiaController.create)
  .delete(docGiaController.deleteAll);

router
  .route("/:id")
  .get(docGiaController.findOne)
  .put(docGiaController.update)
  .delete(docGiaController.delete);

module.exports = router;

const express = require("express");
const sachController = require("../controllers/sach.controller");

const router = express.Router();

router
  .route("/")
  .get(sachController.findAll)
  .post(sachController.create)
  .delete(sachController.deleteAll);

router
  .route("/:id")
  .get(sachController.findOne)
  .put(sachController.update)
  .delete(sachController.delete);

module.exports = router;

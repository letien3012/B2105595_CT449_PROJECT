const express = require("express");
const nhanvien = require("../controllers/nhanvien.controller");
const { route } = require("./nhaxuatban.route");

const router = express.Router();

router
  .route("/")
  .get(nhanvien.findAll)
  .post(nhanvien.login)
  .delete(nhanvien.deleteAll);

router.route("/signup").post(nhanvien.create)
// router.route("/favorite").get(contacts.findAllFavorite);

router
  .route("/:id")
  .get(nhanvien.findOne)
  .put(nhanvien.update)
  .delete(nhanvien.delete);

module.exports = router;
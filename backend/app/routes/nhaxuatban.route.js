const express = require("express");
const nhaxuatban = require("../controllers/nhaxuatban.controller");

const router = express.Router();

router
  .route("/")
  .get(nhaxuatban.findAll)
  .post(nhaxuatban.create)
  .delete(nhaxuatban.deleteAll);

// router.route("/favorite").get(contacts.findAllFavorite);

router.route("/:maNXB").get(nhaxuatban.findOne)

router
  .route("/:id")
  .put(nhaxuatban.update)
  .delete(nhaxuatban.delete);

module.exports = router;
const express = require("express");
const sach = require("../controllers/docgia.controller");

const router = express.Router();

router
  .route("/")
  .get(sach.findAll)
  .post(sach.create)
  .delete(sach.deleteAll);

// router.route("/favorite").get(contacts.findAllFavorite);

router
  .route("/:id")
  .get(sach.findOne)
  .put(sach.update)
  .delete(sach.delete);

module.exports = router;
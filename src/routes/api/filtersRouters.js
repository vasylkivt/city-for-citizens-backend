const express = require("express");

const router = express.Router();

const {
  getFiltersController,
} = require("../../controllers/filters/filtersControllers");

router.route("/").get(getFiltersController);

module.exports = router;

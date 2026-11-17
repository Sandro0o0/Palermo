const express = require("express");
const router = express.Router();

// Controles
const { create } = require("../controls/categoryControl");

router.route("/").post(create);

module.exports = router;

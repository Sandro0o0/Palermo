const express = require("express");
const router = express.Router();

// Controles
const { register, login, refresh } = require("../controls/userControl");

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/refresh/:refresh").post(refresh);
module.exports = router;

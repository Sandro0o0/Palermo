const express = require("express");
const router = express.Router();

const { create } = require("../controls/transactionContorl");
const authenticate = require("../middlwares/authenticate");
const { givePermission } = require("../permissions/permision");

router
  .route("/")
  .post(authenticate, givePermission(["admin", "manager"]), create);

module.exports = router;

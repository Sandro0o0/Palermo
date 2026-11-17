const express = require("express");
const router = express.Router();

// Middleware
const authenticate = require("../middlwares/authenticate");
const { givePermission } = require("../permissions/permision");

// Imports
const { create } = require("../controls/ingredients");

router
  .route("/")
  .post(authenticate, givePermission(["admin", "manager"]), create);

module.exports = router;

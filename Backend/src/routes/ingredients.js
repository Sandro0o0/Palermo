const express = require("express");
const router = express.Router();

// Middleware
const authenticate = require("../middlwares/authenticate");
const { givePermission } = require("../permissions/permision");

// Imports
const { create, getAll } = require("../controls/ingredients");

router
  .route("/")
  .post(authenticate, givePermission(["admin", "manager"]), create)
  .get(getAll);

module.exports = router;

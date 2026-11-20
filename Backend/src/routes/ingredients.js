const express = require("express");
const router = express.Router();

// Middleware
const authenticate = require("../middlwares/authenticate");
const { givePermission } = require("../permissions/permision");

// Imports
const {
  create,
  getAll,
  getSingle,
  deactivate,
} = require("../controls/ingredients");

router
  .route("/")
  .post(authenticate, givePermission(["admin", "manager"]), create)
  .get(authenticate, givePermission(["admin", "manager"]), getAll);

router
  .route("/:id")
  .get(authenticate, givePermission(["admin", "manager"]), getSingle)
  .delete(authenticate, givePermission(["admin", "manager"]), deactivate);

module.exports = router;

const express = require("express");
const router = express.Router();

// Permission
const { givePermission } = require("../permissions/permision");

// Imports
const authenticate = require("../middlwares/authenticate");
const {
  create,
  getSingle,
  getAll,
  getLowStock,
} = require("../controls/productControl");

router
  .route("/")
  .post(authenticate, givePermission(["admin", "manager"]), create)
  .get(authenticate, givePermission(["admin", "manager"]), getAll);

router.route("/lowstock").get(getLowStock);
router.route("/:id").get(getSingle);

module.exports = router;

const express = require("express");
const router = express.Router();
const superAdminController = require("../controllers/superadminController");
const adminController = require("../controllers/adminController");
const memberController = require("../controllers/memberController");
const authController = require("../controllers/authController");

router.post("/superadmin/login", superAdminController.login);
router.post(
  "/superadmin/admin/add",
  authController.authorizeSuperadmin,
  adminController.create
);
router.post("/admin/login", adminController.login);
router.post("/member/register", memberController.register);
router.post("/member/login", memberController.login);
router.get("/users", authController.authorize, authController.whoAmI);

module.exports = router;

const express = require("express");
const router = express.Router();
const superAdminController = require("../controllers/superadminController");
const adminController = require("../controllers/adminController");
const memberController = require("../controllers/memberController");

router.post("/superadmin/login", superAdminController.login);
router.post("/admin/login", adminController.login);
router.post("/admin/register", adminController.create);
router.post("/member/login", memberController.login);
router.post("/member/register", memberController.create);

module.exports = router;

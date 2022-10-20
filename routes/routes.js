const express = require("express");
const router = express.Router();
const superAdminController = require("../controllers/superadminController");
const adminController = require("../controllers/adminController");
const memberController = require("../controllers/memberController");
const authController = require("../controllers/authController");
const carController = require("../controllers/carController");

const prefix = "/api/v1";

// Super Admin Routes
router.post(prefix + "/superadmin/login", superAdminController.login);
router.post(
  prefix + "/superadmin/admin/add",
  authController.authorizeSuperadmin,
  adminController.create
);
// Admin Routes
router.post(prefix + "/admin/login", adminController.login);
// Member Routes
router.post(prefix + "/member/register", memberController.register);
router.post(prefix + "/member/login", memberController.login);

// Car Routes
router.get(prefix + "/cars", carController.listCar);
router.post(
  prefix + "/cars",
  authController.authorizeAdmin,
  carController.createCar
);
router.put(
  prefix + "/cars/:id",
  authController.authorizeAdmin,
  carController.updateCar
);
router.delete(
  prefix + "/cars/:id",
  authController.authorizeAdmin,
  carController.deleteCar
);

// Auth Routes Who Am I
router.get(prefix + "/users", authController.authorize, authController.whoAmI);

module.exports = router;

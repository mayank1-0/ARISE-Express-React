var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
const isLoggedInAdmin = require("../middleware/isLoggedInAdmin");
const checkLogInAdmin = require("../middleware/checkLogInAdmin");
const upload = require("../middleware/upload");
const AdminController = require("../controller/admin_controller");

/* admin routes */
// admin related apis
/**
 * @swagger
 * /admin/health-check:
 *   get:
 *     tags:
 *       - admin
 */
router.get("/health-check", (req, res) => {
  console.log("Heath Check");
  try {
    res.send({ success: true, message: "Admin Routes Test Success" });
  } catch (e) {
    console.log(e);
  }
});

/**
 * @swagger
 * /admin/create-admin:
 *   post:
 *     tags:
 *       - admin
 */
router.post("/create-admin", AdminController.admin);

/**
 * @swagger
 * /admin/admin-login:
 *   get:
 *     tags:
 *       - admin
 */

router.get("/admin-login", isLoggedInAdmin, AdminController.admin_login);

/**
 * @swagger
 * /admin/login-admin:
 *   post:
 *     tags:
 *       - admin
 */

router.post("/login-admin", AdminController.login_admin);

/**
 * @swagger
 * /admin/admin-dashboard:
 *   get:
 *     tags:
 *       - admin
 */

router.get(
  "/admin-dashboard",
  checkLogInAdmin,
  AdminController.admin_dashboard
);

/**
 * @swagger
 * /admin/admin-change-password:
 *   get:
 *     tags:
 *       - admin
 */

router.get(
  "/admin-change-password",
  checkLogInAdmin,
  AdminController.admin_change_password
);

/**
 * @swagger
 * /admin/change-password-admin:
 *   put:
 *     tags:
 *       - admin
 */

router.put(
  "/change-password-admin",
  auth,
  AdminController.change_password_admin
);

/**
 * @swagger
 * /admin/admin-logout:
 *   get:
 *     tags:
 *       - admin
 */

router.get("/admin-logout", AdminController.admin_logout);

// admin creating/updating staff related apis

/**
 * @swagger
 * /admin/staff-window:
 *   get:
 *     tags:
 *       - admin
 */

router.get("/staff-window", checkLogInAdmin, AdminController.staff_window);

/**
 * @swagger
 * /admin/fetch-all-staff-details:
 *   post:
 *     tags:
 *       - admin
 */

router.post(
  "/fetch-all-staff-details",
  auth,
  AdminController.fetch_all_staff_details
);

/**
 * @swagger
 * /admin/add-staff:
 *   get:
 *     tags:
 *       - admin
 */

router.get("/add-staff", checkLogInAdmin, AdminController.add_staff_window);

/**
 * @swagger
 * /admin/add-staff:
 *   post:
 *     tags:
 *       - admin
 */

router.post("/add-staff", auth, AdminController.add_staff);

/**
 * @swagger
 * /admin/update-staff_1:
 *   get:
 *     tags:
 *       - admin
 */

router.get(
  "/update-staff_1",
  checkLogInAdmin,
  AdminController.update_staff_window_1
);

/**
 * @swagger
 * /admin/update-staff_2:
 *   get:
 *     tags:
 *       - admin
 */

router.get(
  "/update-staff_2",
  checkLogInAdmin,
  AdminController.update_staff_window_2
);

/**
 * @swagger
 * /admin/update-staff-status:
 *   put:
 *     tags:
 *       - admin
 */

router.put("/update-staff-status", auth, AdminController.update_staff_status);

/**
 * @swagger
 * /admin/check-employment-number:
 *   post:
 *     tags:
 *       - admin
 */

router.post(
  "/check-employment-number",
  auth,
  AdminController.check_employment_number
);

/**
 * @swagger
 * /admin/fetch-staff-details:
 *   post:
 *     tags:
 *       - admin
 */

router.post("/fetch-staff-details", auth, AdminController.fetchStaffDetails);

module.exports = router;

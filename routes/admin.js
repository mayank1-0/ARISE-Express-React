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
 *     responses:
 *       200:
 *         description: Ok.
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
 *     responses:
 *       200:
 *         description: Created admin successfully.
 *       500:
 *         description: Something went wrong
 */
router.post("/create-admin", AdminController.admin);



router.get("/admin-login", isLoggedInAdmin, AdminController.admin_login);

/**
 * @swagger
 * /admin/login-admin:
 *   post:
 *     tags:
 *       - admin
 *     responses:
 *       200:
 *         description: Admin log-in successful.
 *       401:
 *         description: User not found. Please try again
 *       500:
 *         description: Something went wrong
 */

router.post("/login-admin", AdminController.login_admin);



router.get(
  "/admin-dashboard",
  checkLogInAdmin,
  AdminController.admin_dashboard
);



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
 *     responses:
 *       200:
 *         description: Admin changed password successfully.
 *       401:
 *         description: Fill all password fields || enter same new password and confirm new password || Incorrect old password
 *       500:
 *         description: Something went wrong
 */

router.put(
  "/change-password-admin",
  auth,
  AdminController.change_password_admin
);



router.get("/admin-logout", AdminController.admin_logout);

// admin creating/updating staff related apis



router.get("/staff-window", checkLogInAdmin, AdminController.staff_window);

/**
 * @swagger
 * /admin/fetch-all-staff-details:
 *   post:
 *     tags:
 *       - admin
 *     responses:
 *       200:
 *         description: All staff details fetched successfully.
 *       500:
 *         description: Something went wrong
 */

router.post(
  "/fetch-all-staff-details",
  auth,
  AdminController.fetch_all_staff_details
);



router.get("/add-staff", checkLogInAdmin, AdminController.add_staff_window);

/**
 * @swagger
 * /admin/add-staff:
 *   post:
 *     tags:
 *       - admin
 *     responses:
 *       200:
 *         description: Staff added successfully.
 *       500:
 *         description: Something went wrong
 */

router.post("/add-staff", auth, AdminController.add_staff);



router.get(
  "/update-staff_1",
  checkLogInAdmin,
  AdminController.update_staff_window_1
);



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
 *     responses:
 *       200:
 *         description: Staff status updated successfully.
 *       500:
 *         description: Something went wrong
 */

router.put("/update-staff-status", auth, AdminController.update_staff_status);

/**
 * @swagger
 * /admin/check-employment-number:
 *   post:
 *     tags:
 *       - admin
 *     responses:
 *       200:
 *         description: Successfully fetched employee details.
 *       404:
 *         description: No such employee with given employment number exist
 *       500:
 *         description: Something went wrong
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
 *     responses:
 *       200:
 *         description: Fetched staff details successfully.
 *       500:
 *         description: Something went wrong
 */

router.post("/fetch-staff-details", auth, AdminController.fetchStaffDetails);

module.exports = router;

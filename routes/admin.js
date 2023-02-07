var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
const isLoggedInAdmin = require("../middleware/isLoggedInAdmin");
const checkLogInAdmin = require("../middleware/checkLogInAdmin");
const upload = require("../middleware/upload");
const AdminController = require("../controller/admin_controller");

/* admin routes */
// admin related apis

router.get("/health-check", (req, res) => {
  console.log("Heath Check");
  try {
    res.send({ success: true, message: "Admin Routes Test Success" });
  } catch (e) {
    console.log(e);
  }
});
router.post("/create-admin", AdminController.admin);
router.get("/admin-login", isLoggedInAdmin, AdminController.admin_login);
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
router.put(
  "/change-password-admin",
  auth,
  AdminController.change_password_admin
);
router.get("/admin-logout", AdminController.admin_logout);

// admin creating/updating staff related apis
router.get("/staff-window", checkLogInAdmin, AdminController.staff_window);
router.post(
  "/fetch-all-staff-details",
  auth,
  AdminController.fetch_all_staff_details
);
router.get("/add-staff", checkLogInAdmin, AdminController.add_staff_window);
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
router.put("/update-staff-status", auth, AdminController.update_staff_status);
router.post(
  "/check-employment-number",
  auth,
  AdminController.check_employment_number
);
router.post("/fetch-staff-details", auth, AdminController.fetchStaffDetails);

module.exports = router;

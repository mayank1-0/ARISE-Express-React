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
 *     summary: creates an admin with username "admin" and password "admin"
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Admin's username.
 *                 example: ron
 *               password:
 *                 type: string
 *                 description: Admin's password.
 *                 example: weasley
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: Admin's old name.
 *                 example: pass
 *               password:
 *                 type: string
 *                 description: Admin's new password.
 *                 example: password
 *               confirmPassword:
 *                 type: string
 *                 description: Admin's new password.
 *                 example: password
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               center:
 *                 type: string
 *                 description: center-name.
 *                 example: center-1
 *               type:
 *                 type: string
 *                 description: teaching/non-teaching
 *                 example: non-teaching
 *               designation:
 *                 type: string
 *                 description: staff/faculty
 *                 example: staff
 *               Employee_Name:
 *                 type: string
 *                 description: Name of employee
 *                 example: Harry Potter
 *               Father_Name:
 *                 type: string
 *                 description: Name of employee's father
 *                 example: James Potter
 *               Date_of_joining:
 *                 type: string
 *                 description: Date of employee's joining
 *                 example: 1-1-2022
 *               Date_of_Birth:
 *                 type: string
 *                 description: Employee's date of birth
 *                 example: 1-1-2022
 *               Marital_status:
 *                 type: string
 *                 description: Employee's marital status
 *                 example: married
 *               sex:
 *                 type: string
 *                 description: Employee's sex
 *                 example: Male
 *               Current_Address:
 *                 type: string
 *                 description: Employee's current address
 *                 example: 221-B
 *               Sector_Village_Colony:
 *                 type: string
 *                 description: Residence area
 *                 example: Baker's Street
 *               Contact_number:
 *                 type: string
 *                 description: Employee's contact number
 *                 example: 9999999999
 *               email:
 *                 type: string
 *                 description: Employee's email-id
 *                 example: y@y.com
 *               Educational_qualification:
 *                 type: string
 *                 description: Employee's educational qualification
 *                 example: Matric
 *               Professional_qualification:
 *                 type: string
 *                 description: Employee's professional qualification
 *                 example: Graduate
 *               Adhar_card_number_scan_copy:
 *                 type: string
 *                 description: Adhar card number
 *                 example: 9999-9999-9999-9999
 *               username:
 *                 type: string
 *                 description: Employee's user name
 *                 example: Thomas
 *               password:
 *                 type: string
 *                 description: Employee's login password
 *                 example: Thomas1
 *               status:
 *                 type: integer
 *                 description: Employee's status with organisation 1-currently working, 0-left
 *                 example: 1
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employment_number:
 *                 type: string
 *                 description: Employee's employment number.
 *                 example: 1111
 *               Promotion_date:
 *                 type: string
 *                 description: Employee's promotion date.
 *                 example: 1-1-2023
 *               designation:
 *                 type: string
 *                 description: Employee's designation.
 *                 example: center-head
 *               Date_of_job_leave:
 *                 type: string
 *                 description: Employee's date of leaving job.
 *                 example: 1-1-2023
 *               Reason:
 *                 type: string
 *                 description: Employee's reason of job leave.
 *                 example: low salary
 *               status:
 *                 type: integer
 *                 description: Employee's new status 1-working, 0-left
 *                 exapmle: 0
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employment_number:
 *                 type: string
 *                 description: Employee's employment number.
 *                 example: 1111
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employment_number:
 *                 type: string
 *                 description: Employee's employment number.
 *                 example: 1111
 *     responses:
 *       200:
 *         description: Fetched staff details successfully.
 *       500:
 *         description: Something went wrong
 */

router.post("/fetch-staff-details", auth, AdminController.fetchStaffDetails);

module.exports = router;

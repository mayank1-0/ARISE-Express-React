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

// centre related apis

/**
 * @swagger
 * /admin/fetch-all-centre-details:
 *   get:
 *     tags:
 *       - admin
 *     responses:
 *       200:
 *         description: All centre details fetched successfully.
 *       500:
 *         description: Something went wrong
 */

router.get(
  "/fetch-all-centre-details",
  AdminController.fetch_all_centre_details
);

/**
 * @swagger
 * /admin/add-centre:
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
 *               centre_code:
 *                 type: string
 *                 description: centre-code.
 *                 example: c1
 *               centre_name:
 *                 type: string
 *                 description: centre-name
 *                 example: Arise centre 1
 *               centre_head_name:
 *                 type: string
 *                 description: centre head name
 *                 example: Nimrita
 *               centre_contact_number:
 *                 type: integer
 *                 description: Centre's contact number
 *                 example: 0129-444444
 *               centre_address:
 *                 type: string
 *                 description: Address of centre
 *                 example: 221B Baker's street
 *               centre_start_date:
 *                 type: string
 *                 description: Date of centre's creation
 *                 example: 1-1-2022
 *               centre_valid_upto:
 *                 type: string
 *                 description: Date till which centre is valid
 *                 example: 1-1-2023
 *               centre_head_contact_number:
 *                 type: integer
 *                 description: Centre head's contact number
 *                 example: 9999999999
 *               sector_village:
 *                 type: string
 *                 description: Centre's sector_village
 *                 example: 4
 *               email_id:
 *                 type: string
 *                 description: Centre head's email-id
 *                 example: 221-B
 *               username:
 *                 type: string
 *                 description: Centre head's user-name
 *                 example: Abla
 *               password:
 *                 type: string
 *                 description: Centre head account's password
 *                 example: 9999999999
 *               isActive:
 *                 type: boolean
 *                 description: whether centre is active or not
 *                 example: true
 *     responses:
 *       200:
 *         description: Centre added successfully.
 *       500:
 *         description: Something went wrong
 */

router.post("/add-centre", AdminController.add_centre);

/**
 * @swagger
 * /admin/update-centre:
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
 *               centre_code:
 *                 type: string
 *                 description: Centre's code.
 *                 example: c1
 *               centre_name:
 *                 type: string
 *                 description: Centre's name.
 *                 example: a1 centre
 *               centre_head_name:
 *                 type: string
 *                 description: Centre head's name.
 *                 example: Nattu
 *               centre_contact_number:
 *                 type: integer
 *                 description: Centre's contact number
 *                 example: 0129-4128527
 *               centre_address:
 *                 type: string
 *                 description: Centre's address
 *                 example: 221B Baker's street
 *               centre_start_date:
 *                 type: string
 *                 description: Date when centre started.
 *                 example: 1-1-2023
 *               centre_valid_upto:
 *                 type: string
 *                 description: Date till centre is valid upto.
 *                 example: 1-5-2023
 *               centre_head_contact_number:
 *                 type: integer
 *                 description: Centre head's contact number
 *                 exapmle: 8888888888
 *               sector_village:
 *                 type: string
 *                 description: Centre's address sector/village
 *                 exapmle: 88
 *               email_id:
 *                 type: string
 *                 description: Centre head's email-id
 *                 exapmle: a@a.com
 *               username:
 *                 type: string
 *                 description: Centre head's username
 *                 exapmle: a
 *               password:
 *                 type: string
 *                 description: Centre head account's password
 *                 exapmle: a
 *     responses:
 *       200:
 *         description: Centre details updated successfully.
 *       500:
 *         description: Something went wrong
 */

router.put("/update-centre", AdminController.update_centre);

// admin creating/updating staff related apis

router.get("/staff-window", checkLogInAdmin, AdminController.staff_window);

/**
 * @swagger
 * /admin/fetch-all-staff-details:
 *   get:
 *     tags:
 *       - admin
 *     responses:
 *       200:
 *         description: All staff details fetched successfully.
 *       500:
 *         description: Something went wrong
 */

router.get(
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

// enquiry related routes

/**
 * @swagger
 * /admin/fetch-all-enquiry-details:
 *   get:
 *     tags:
 *       - admin
 *     responses:
 *       200:
 *         description: All enquiry details fetched successfully.
 *       500:
 *         description: Something went wrong
 */

router.get(
  "/fetch-all-enquiry-details",
  auth,
  AdminController.fetch_all_staff_details
);

/**
 * @swagger
 * /admin/add-enquiry:
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
 *               Date_and_time:
 *                 type: dateTime
 *                 description: Date and time when enquiry is created.
 *                 example: 2023-02-15 16:49:44
 *               Enquiry_name:
 *                 type: string
 *                 description: Name of enquiry
 *                 example: Enquiry1
 *               Course:
 *                 type: string
 *                 description: course name
 *                 example: e-taxation
 *               Contact_number_1:
 *                 type: integer
 *                 description: Contact number of enquirer
 *                 example: 8888888888
 *               Contact_number_2:
 *                 type: integer
 *                 description: Secondary contact number of enquirer
 *                 example: 777777777
 *               Address:
 *                 type: string
 *                 description: Address of enquirer
 *                 example: 221B Baker's street
 *               isActive:
 *                 type: boolean
 *                 description: whether the enquiry is still active or not
 *                 example: true
 *               Follow_up_date:
 *                 type: date
 *                 description: Follow up date of enquiry
 *                 example: 1-1-2023
 *               Counsellor_name:
 *                 type: string
 *                 description: Counsellor name
 *                 example: Rohit
 *               Counsellor_remarks:
 *                 type: string
 *                 description: Counsellor's remarks
 *                 example: Promising enquiry
 *     responses:
 *       200:
 *         description: Enquiry added successfully.
 *       500:
 *         description: Something went wrong
 */

router.post("/add-enquiry", auth, AdminController.add_enquiry);

/**
 * @swagger
 * /admin/enquiry-follow-up:
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
 *               Follow_up_date:
 *                 type: string
 *                 description: Centre name.
 *                 example: a1 centre
 *               Counsellor_name:
 *                 type: string
 *                 description: Centre head name.
 *                 example: Nattu
 *               Counsellor_remarks:
 *                 type: integer
 *                 description: Centre contact number
 *                 example: 0129-4128527
 *               Enquiry_status:
 *                 type: string
 *                 description: Centre address
 *                 example: 221B Baker street
 *               Enquiry_Number:
 *                 type: integer
 *                 description: Enquiry number.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Enquiry-follow-up updated successfully.
 *       500:
 *         description: Something went wrong
 */

router.put("/enquiry-follow-up", auth, AdminController.enquiry_follow_up);

// courses related routes

/**
 * @swagger
 * /admin/fetch-all-courses-details:
 *   get:
 *     tags:
 *       - admin
 *     responses:
 *       200:
 *         description: All courses details fetched successfully.
 *       500:
 *         description: Something went wrong
 */

router.get(
  "/fetch-all-courses-details",
  auth,
  AdminController.fetch_all_courses_details
);


/**
 * @swagger
 * /admin/add-course:
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
 *               course_code:
 *                 type: string
 *                 description: course's code.
 *                 example: ET1
 *               duration:
 *                 type: integer
 *                 description: Duration of course in months
 *                 example: 6
 *               course:
 *                 type: string
 *                 description: course name
 *                 example: e-taxation
 *               registration_fee:
 *                 type: integer
 *                 description: Course's registration Fee
 *                 example: 750
 *               monthly_fee:
 *                 type: integer
 *                 description: Course's monthly fee
 *                 example: 1000
 *               total_fee:
 *                 type: integer
 *                 description: Sum of registration and monthly fee
 *                 example: 1750
 *     responses:
 *       200:
 *         description: Course added successfully.
 *       500:
 *         description: Something went wrong
 */

router.post("/add-course", auth, AdminController.add_course);


/**
 * @swagger
 * /admin/update-course:
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
 *               course_code:
 *                 type: string
 *                 description: Course's code.
 *                 example: cs11
 *               course:
 *                 type: string
 *                 description: Course's name.
 *                 example: e-taxation
 *               duration:
 *                 type: integer
 *                 description: Course's duration( in months )
 *                 example: 4
 *               registration_fee:
 *                 type: integer
 *                 description: Course's registration fee
 *                 example: 750
 *               monthly_fee:
 *                 type: integer
 *                 description: Course's monthly fee
 *                 example: 1000
 *     responses:
 *       200:
 *         description: Centre details updated successfully.
 *       500:
 *         description: Something went wrong
 */

router.put("/update-course", AdminController.update_course);

// admission related routes

/**
 * @swagger
 * /student/fetch-all-student-details:
 *   get:
 *     tags:
 *       - admin
 *     responses:
 *       200:
 *         description: Student details fetched successfully.
 *       500:
 *         description: Something went wrong
 */

router.get(
  "/fetch-all-student-details",
  AdminController.fetch_all_student_details
);

/**
 * @swagger
 * /student/register-student:
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
 *               enrollment_number:
 *                 type: string
 *                 description: Student's enrollment number .
 *                 example: 1
 *               center_code:
 *                 type: string
 *                 description: Student's center code.
 *                 example: c1
 *               registration_number:
 *                 type: string
 *                 description: Student's registration number.
 *                 example: 1111
 *               Student_Name:
 *                 type: string
 *                 description: Student's name.
 *                 example: Abla
 *               Father_Name:
 *                 type: string
 *                 description: Student's father's name.
 *                 example: Tabla
 *               Mother_Name:
 *                 type: string
 *                 description: Student's mother's name.
 *                 example: Babli
 *               Date_of_birth:
 *                 type: string
 *                 description: Student's date of birth.
 *                 example: 1-1-2022
 *               Marital_status:
 *                 type: string
 *                 description: Marital status.
 *                 example: married
 *               Sex:
 *                 type: string
 *                 description: Student's gender.
 *                 example: Trans
 *               Category:
 *                 type: string
 *                 description: Student's category.
 *                 example: abc
 *               Address:
 *                 type: string
 *                 description: Student's residence address.
 *                 example: 551
 *               Sector_Village_Colony:
 *                 type: string
 *                 description: Student's residence area.
 *                 example: Area-51
 *               City:
 *                 type: string
 *                 description: Student's residence city.
 *                 example: Washington
 *               State:
 *                 type: string
 *                 description: Student's residence city.
 *                 example: Holalulu
 *               Pin_code:
 *                 type: integer
 *                 description: Student's residence area pincode.
 *                 example: 121212
 *               Contact_number:
 *                 type: integer
 *                 description: Student's contact number.
 *                 example: 1111111111
 *               Parents_contact:
 *                 type: integer
 *                 description: Student's secondary contact number.
 *                 example: 2222222222
 *               Email_ID:
 *                 type: string
 *                 description: Student's registration number.
 *                 example: a@a.com
 *               Highest_educational_qualification:
 *                 type: string
 *                 description: Student's highest educational qualification.
 *                 example: Matric
 *               course:
 *                 type: string
 *                 description: Student's enrolled course.
 *                 example: Web Development
 *               Duration:
 *                 type: integer
 *                 description: Student's course's duration.
 *                 example: 2 months
 *               course_code:
 *                 type: string
 *                 description: Student's enrolled course code.
 *                 example: wd
 *               Date_of_joining:
 *                 type: string
 *                 description: Student's date of joining.
 *                 example: 1-1-2023
 *               Batch_time:
 *                 type: string
 *                 description: Student's batch time.
 *                 example: 1-2
 *               Registration_fee:
 *                 type: integer
 *                 description: Student's enrolled course registration fee.
 *                 example: 50
 *               Monthly_fee:
 *                 type: integer
 *                 description: Student's course's monthly fee.
 *                 example: 50
 *               Discount:
 *                 type: integer
 *                 description: Discount on fee.
 *                 example: 10
 *               Percent_discount:
 *                 type: integer
 *                 description: discount percentage.
 *                 example: 20
 *               Monthly_installment:
 *                 type: integer
 *                 description: Monthly_installment.
 *                 example: 40
 *               Note:
 *                 type: string
 *                 description: Note.
 *                 example: lalalala
 *               School_name_address:
 *                 type: string
 *                 description: Student's school name.
 *                 example: brigade schhol
 *               Admission_type:
 *                 type: string
 *                 description: Admission type.
 *                 example: standard
 *               Password:
 *                 type: string
 *                 description: Student account password
 *                 example: abc123 
 *     responses:
 *       200:
 *         description: Successfully registered student.
 *       500:
 *         description: Something went wrong
 */

router.post("/register-student", AdminController.register_student);

/**
 * @swagger
 * /student/update-student-personal-details:
 *   put:
 *     tags:
 *       - student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Father_Name:
 *                 type: string
 *                 description: Student's father's name .
 *                 example: Severus
 *               Date_of_birth:
 *                 type: string
 *                 description: Student's date of birth .
 *                 example: 1-1-2023
 *               Marital_Status:
 *                 type: string
 *                 description: Student's marital status .
 *                 example: married
 *               Sex:
 *                 type: string
 *                 description: Student's gender .
 *                 example: male
 *               Contact_number:
 *                 type: string
 *                 description: Student's contact number .
 *                 example: 9999999999
 *               Parents_contact:
 *                 type: string
 *                 description: Student's parent's contact number .
 *                 example: 8888888888
 *               Address:
 *                 type: string
 *                 description: Student's residential address .
 *                 example: 221-B
 *               Sector_Village_Colony:
 *                 type: string
 *                 description: Student's area location .
 *                 example: Baker's street
 *               City:
 *                 type: string
 *                 description: Student's city location .
 *                 example: New Hampshire
 *               Email_ID:
 *                 type: string
 *                 description: Student's emailID .
 *                 example: abc@abc.com
 *     responses:
 *       200:
 *         description: Information updated successfully.
 *       500:
 *         description: Something went wrong
 */

router.put(
  "/update-student-personal-details",
  AdminController.update_student_personal_details
);

module.exports = router;

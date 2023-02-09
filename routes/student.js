var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
const isLoggedIn = require("../middleware/isLoggedIn");
const checkLogIn = require("../middleware/checkLogIn");
const upload = require("../middleware/upload");

const StudentControllers = require("../controller/student_controller");

/* GET home page. */
router.get("/health-check", (req, res) => {
  console.log("Heath Check");
  try {
    res.send({ success: true, message: "Student Routes Test Success" });
  } catch (e) {
    console.log(e);
  }
});

// student registration, login and related routes/apis

router.get("/registration-form", StudentControllers.registration_form);

/**
 * @swagger
 * /student/register-student:
 *   post:
 *     tags:
 *       - student
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

router.post("/register-student", StudentControllers.register_student);

router.get("/student-login", StudentControllers.student_login);

/**
 * @swagger
 * /student/login-student:
 *   post:
 *     tags:
 *       - student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enrollment_number:
 *                 type: string
 *                 description: Student's enrollment_number .
 *                 example: 22
 *               password:
 *                 type: string
 *                 description: Student's acoount's password .
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successfully.
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Something went wrong
 */

router.post("/login-student", StudentControllers.login_student);

/**
 * @swagger
 * /student/fetch-student-personal-details:
 *   post:
 *     tags:
 *       - student
 *     responses:
 *       200:
 *         description: Details fetched successfully.
 *       500:
 *         description: Something went wrong
 */

router.post(
  "/fetch-student-personal-details",
  StudentControllers.fetch_student_personal_details
);

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
  StudentControllers.update_student_personal_details
);

module.exports = router;

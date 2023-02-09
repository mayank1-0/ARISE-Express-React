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

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

/**
 * @swagger
 * /student/registration-form:
 *   get:
 *     tags:
 *       - student
 */

router.get("/registration-form", StudentControllers.registration_form);

/**
 * @swagger
 * /student/register-student:
 *   post:
 *     tags:
 *       - student
 */

router.post("/register-student", StudentControllers.register_student);

/**
 * @swagger
 * /student/student-login:
 *   get:
 *     tags:
 *       - student
 */

router.get("/student-login", StudentControllers.student_login);

/**
 * @swagger
 * /student/login-student:
 *   post:
 *     tags:
 *       - student
 */

router.post("/login-student", StudentControllers.login_student);

/**
 * @swagger
 * /student/fetch-student-personal-details:
 *   post:
 *     tags:
 *       - student
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
 */

router.put(
  "/update-student-personal-details",
  StudentControllers.update_student_personal_details
);

module.exports = router;

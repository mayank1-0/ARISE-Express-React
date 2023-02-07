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

// student registration and login apis
router.get("/registration-form", StudentControllers.registration_form);
router.post("/register-student", StudentControllers.register_student);
router.get("/student-login", StudentControllers.student_login);
router.post("/login-student", StudentControllers.login_student);

// student related routes
router.post(
  "/fetch-student-personal-details",
  StudentControllers.fetch_student_personal_details
);
router.put(
  "/update-student-personal-details",
  StudentControllers.update_student_personal_details
);

module.exports = router;

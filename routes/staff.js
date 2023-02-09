var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedInStaff = require("../middleware/isLoggedInStaff");
const checkLogIn = require("../middleware/checkLogIn");
const upload = require("../middleware/upload");
const StaffController = require("../controller/staff_controller");
const checkLogInStaff = require("../middleware/checkLogInStaff");

// staff related routes

/**
 * @swagger
 * /staff/health-check:
 *   get:
 *     tags:
 *       - staff
 *     responses:
 *       200:
 *         description: Created admin successfully.
 */

router.get("/health-check", (req, res) => {
  console.log("Heath Check");
  try {
    res.send({ success: true, message: "Staff Routes Test Success" });
  } catch (e) {
    console.log(e);
  }
});



router.get("/staff-login", isLoggedInStaff, StaffController.staff_login); //

/**
 * @swagger
 * /staff/login-staff:
 *   post:
 *     tags:
 *       - staff
 *     responses:
 *       200:
 *         description: Logged in successfully.
 *       401:
 *         description: User not found || Invalid password
 *       500:
 *         description: Something went wrong
 */

router.post("/login-staff", StaffController.login_staff); //



router.get(
  "/staff-dashboard",
  checkLogInStaff,
  StaffController.staff_dashboard
); //

/**
 * @swagger
 * /staff/fetch-staff-details:
 *   post:
 *     tags:
 *       - staff
 *     responses:
 *       200:
 *         description: Fetched staff details successfully.
 *       500:
 *         description: Something went wrong
 */

router.post("/fetch-staff-details", auth, StaffController.fetchStaffDetails); //



router.get("/update-profile", checkLogInStaff, StaffController.update_profile); //

/**
 * @swagger
 * /staff/profile-update:
 *   put:
 *     tags:
 *       - staff
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       500:
 *         description: Something went wrong
 */

router.put("/profile-update", auth, StaffController.profile_update); //



router.get(
  "/staff-change-password",
  checkLogInStaff,
  StaffController.staff_change_password
); //

/**
 * @swagger
 * /staff/change-password-staff:
 *   put:
 *     tags:
 *       - staff
 *     responses:
 *       200:
 *         description: Staff password changed successfully.
 *       401:
 *         description: Fill all password fields || enter same new password and confirm new password || Incorrect old password
 *       500:
 *         description: Something went wrong
 */

router.put(
  "/change-password-staff",
  auth,
  StaffController.change_password_staff
); //

/**
 * @swagger
 * /staff/staff-logout:
 *   get:
 *     tags:
 *       - staff
 */

router.get("/staff-logout", StaffController.staff_logout); //

// adding question-answers route

router.get(
  "/question-answer-login",
  isLoggedIn,
  StaffController.question_answer_login
); //<--
router.post("/login-question-answer", StaffController.login_question_answer); //<--
router.get(
  "/question-answer-choose",
  checkLogIn,
  StaffController.question_answers_choose
); //<--
router.get(
  "/question-answer-form",
  checkLogIn,
  StaffController.question_answer_form
); //<--
router.get(
  "/question-answer-form-2",
  checkLogIn,
  StaffController.question_answer_form_2
); //<--
router.post("/add-question-answer", auth, StaffController.add_question_answer); //<--

/**
 * @swagger
 * /staff/upload-csv-file:
 *   post:
 *     tags:
 *       - staff
 *     responses:
 *       200:
 *         description: Uploaded the file successfully.
 *       400:
 *         description: Upload a csv file
 *       500:
 *         description: Failed to import data into database || Could not upload the file.
 */

router.post(
  "/upload-csv-file",
  upload.single("file"),
  StaffController.uploadCsvFile
); //<--

router.get(
  "/edit-question-answer-1",
  checkLogIn,
  StaffController.edit_question_answer_form_1
);
router.get(
  "/edit-question-answer-2",
  checkLogIn,
  StaffController.edit_question_answer_form_2
);
router.put("/edit-question-answer", auth, StaffController.edit_question_answer);
router.post("/checkQuestionId", auth, StaffController.check_question_id);
router.delete(
  "/delete-question-answer/:questionId",
  auth,
  StaffController.delete_question_answer
);
router.get("/question-answers", checkLogIn, StaffController.question_answers);
router.post(
  "/view-question-answers",
  auth,
  StaffController.view_question_answers
);

// single admissions api and exam related apis



router.get("/admission", StaffController.admissions);



router.get("/exam", StaffController.exam);

/**
 * @swagger
 * /staff/fetch-all-exam-details:
 *   post:
 *     tags:
 *       - staff
 *     responses:
 *       200:
 *         description: Exam details fetched successfully.
 *       500:
 *         description: Something went wrong
 */

router.post("/fetch-all-exam-details", StaffController.fetchAllExamDetails);



router.get("/add-exam", StaffController.add_exam);

/**
 * @swagger
 * /staff/add-exam:
 *   post:
 *     tags:
 *       - staff
 *     responses:
 *       200:
 *         description: Added exam and questions successfully.
 *       500:
 *         description: Exam and question/answers not added successfully. Something went wrong
 */

router.post("/add-exam", StaffController.add_exam_db);

module.exports = router;

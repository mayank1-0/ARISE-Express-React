var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
const isLoggedIn = require('../middleware/isLoggedIn');
const checkLogIn = require('../middleware/checkLogIn');
const upload = require("../middleware/upload");


const { registration_form, register_student, student_login, login_student } = require('../controller/student_controller')
const { add_staff, staff_login, login_staff, staff_dashboard, fetchStaffDetails, admissions, question_answer_login, question_answers_choose, login_question_answer, question_answer_form, question_answer_form_2, add_question_answer, edit_question_answer_form_1, edit_question_answer_form_2, edit_question_answer, check_question_id, delete_question_answer, uploadCsvFile, question_answers, view_question_answers} = require('../controller/staff_controller')

router.get('/registration-form', registration_form)
router.post('/register-student', register_student)
router.get('/student-login', student_login)
router.post('/login-student', login_student)
router.get('/admission', admissions)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ARISE' });
});

module.exports = router;

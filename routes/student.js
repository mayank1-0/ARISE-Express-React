var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
const isLoggedIn = require('../middleware/isLoggedIn');
const checkLogIn = require('../middleware/checkLogIn');
const upload = require("../middleware/upload");


const { registration_form, register_student, student_login, login_student, fetch_student_personal_details, update_student_personal_details} = require('../controller/student_controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ARISE' });
});

// student registration and login apis
router.get('/registration-form', registration_form)
router.post('/register-student', register_student)
router.get('/student-login', student_login)
router.post('/login-student', login_student)

// student related routes
router.post('/fetch-student-personal-details', fetch_student_personal_details)
router.put('/update-student-personal-details', update_student_personal_details)

module.exports = router;

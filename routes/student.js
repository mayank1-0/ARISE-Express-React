var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
const isLoggedIn = require('../middleware/isLoggedIn');
const checkLogIn = require('../middleware/checkLogIn');
const upload = require("../middleware/upload");


const { registration_form, register_student, student_login, login_student} = require('../controller/student_controller')

router.get('/registration-form', registration_form)
router.post('/register-student', register_student)
router.get('/student-login', student_login)
router.post('/login-student', login_student)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ARISE' });
});

module.exports = router;

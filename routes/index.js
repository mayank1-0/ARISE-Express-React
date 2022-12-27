var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
const isLoggedIn = require('../middleware/isLoggedIn');
const checkLogIn = require('../middleware/checkLogIn');
const upload = require("../middleware/upload");


const { registration_form, register_student, student_login, login_student, question_answer_login, question_answers_choose, login_question_answer, question_answer_form, question_answer_form_2, add_question_answer, edit_question_answer_form_1, edit_question_answer_form_2, edit_question_answer, check_question_id, delete_question_answer, uploadCsvFile, question_answers, view_question_answers } = require('../controller/student_controller')

router.get('/registration-form', registration_form)
router.post('/register-student', register_student)
router.get('/student-login', student_login)
router.post('/login-student', login_student)
router.get('/question-answer-login', isLoggedIn, question_answer_login)
router.post('/login-question-answer', login_question_answer)
router.get('/question-answer-choose', checkLogIn, question_answers_choose)
router.get('/question-answer-form', checkLogIn, question_answer_form)
router.get('/question-answer-form-2', checkLogIn, question_answer_form_2);
router.post('/add-question-answer', auth, add_question_answer)
router.post('/upload-csv-file', upload.single("file"), uploadCsvFile)
router.get('/edit-question-answer-1', checkLogIn, edit_question_answer_form_1);
router.get('/edit-question-answer-2', checkLogIn, edit_question_answer_form_2);
router.put('/edit-question-answer', auth, edit_question_answer)
router.post('/checkQuestionId', auth, check_question_id)
router.delete('/delete-question-answer/:questionId', auth, delete_question_answer)
router.get('/question-answers', checkLogIn, question_answers);
router.post('/view-question-answers', auth, view_question_answers)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ARISE' });
});

module.exports = router;

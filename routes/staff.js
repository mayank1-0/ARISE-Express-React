var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedInStaff = require('../middleware/isLoggedInStaff');
const checkLogIn = require('../middleware/checkLogIn');
const upload = require("../middleware/upload");
const { add_staff, staff_login, login_staff, staff_dashboard, fetchStaffDetails, admissions, question_answer_login, question_answers_choose, login_question_answer, question_answer_form, question_answer_form_2, add_question_answer, edit_question_answer_form_1, edit_question_answer_form_2, edit_question_answer, check_question_id, delete_question_answer, uploadCsvFile, question_answers, view_question_answers, update_profile, profile_update, staff_change_password, change_password_staff, staff_logout} = require('../controller/staff_controller');
const checkLogInStaff = require('../middleware/checkLogInStaff');

// all the staff related routes
router.post('/add-staff', add_staff) //
router.get('/staff-login', isLoggedInStaff, staff_login) //
router.post('/login-staff', login_staff) //
router.get('/staff-dashboard', checkLogInStaff, staff_dashboard) //
router.post('/fetch-staff-details', auth, fetchStaffDetails) //
router.get('/update-profile', checkLogInStaff, update_profile) //
router.put('/profile-update', auth, profile_update) //
router.get('/staff-change-password', checkLogInStaff, staff_change_password) //
router.put('/change-password-staff', auth, change_password_staff) //
router.get('/staff-logout', staff_logout) //
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


module.exports = router;

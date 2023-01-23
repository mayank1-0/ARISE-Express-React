var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
const isLoggedInAdmin = require('../middleware/isLoggedInAdmin');
const checkLogInAdmin = require('../middleware/checkLogInAdmin');
const upload = require("../middleware/upload");
var { admin, admin_login, login_admin, admin_dashboard, admin_change_password, change_password_admin, admin_logout, staff_window, fetch_all_staff_details, add_staff_window, add_staff } = require('../controller/admin_controller');

/* admin routes */
router.post('/create-admin', admin);
router.get('/admin-login', isLoggedInAdmin, admin_login)
router.post('/login-admin', login_admin);
router.get('/admin-dashboard', checkLogInAdmin, admin_dashboard)
router.get('/admin-change-password', checkLogInAdmin, admin_change_password)
router.put('/change-password-admin', auth, change_password_admin)
router.get('/admin-logout', admin_logout)
router.get('/staff-window', checkLogInAdmin, staff_window)
router.post('/fetch-all-staff-details', auth, fetch_all_staff_details)
router.get('/add-staff', checkLogInAdmin, add_staff_window)
router.post('/add-staff', auth, add_staff)

module.exports = router;

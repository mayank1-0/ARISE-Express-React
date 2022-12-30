var express = require('express');
var router = express.Router();
var { admin, admin_login, login_admin, admin_dashboard, admin_change_password, change_password_admin, admin_logout } = require('../controller/admin_controller');

/* admin routes */
router.post('/create-admin', admin);
router.get('/admin-login', admin_login)
router.post('/login-admin', login_admin);
router.get('/admin-dashboard', admin_dashboard)
router.get('/admin-change-password', admin_change_password)
router.put('/change-password-admin', change_password_admin)
router.get('/admin-logout', admin_logout)

module.exports = router;

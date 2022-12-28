var express = require('express');
var router = express.Router();
var { admin, login_admin, change_password_admin } = require('../controller/admin_controller');

/* admin routes */
router.get('/admin-login', function(req, res) {
  res.render('admin_login_page')
});

router.post('/create-admin', admin);
router.post('/login-admin', login_admin);
router.post('/change-password-admin', change_password_admin)

module.exports = router;

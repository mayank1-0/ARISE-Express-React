var express = require('express');
var router = express.Router();
var { admin, login_admin } = require('../controller/admin_controller')

/* admin routes */
router.get('/admin-login', function(req, res) {
  res.render('admin_login_page')
});

router.post('/create-admin', admin);
router.post('/login-admin', login_admin);

module.exports = router;

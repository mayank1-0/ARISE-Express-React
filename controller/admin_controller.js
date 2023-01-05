const jwt = require("jsonwebtoken");
const config = require("../config.json");
const bcrypt = require("bcrypt");

const db = require("../db/models/index");

const admin = async (req, res) => {
  try {
    const admin_credentials = {
      username: "admin",
      password: "admin",
    };
    const Admin = db.Admin_Model;
    const result = await Admin.create(admin_credentials);
    res
      .status(200)
      .send({
        status: 200,
        data: result,
        message: "Admin created successfully",
      });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, data: error, message: "Something went wrong" });
  }
};

const admin_login = (req, res) => {
  res.render('admin_login_page')
}

const login_admin = async (req, res) => {
  try {
    var admin_data = req.body;
    const Admin = db.Admin_Model;
    let admin_credentials = await Admin.findOne({
      plain: true,
      where: { username: admin_data.username },
      attributes: ["id", "username", ["password", "hashedPass"]],
    });
    if (!admin_credentials) {
      res.status(401).send({ message: "User not found. Please try again" });
    } else {
      admin_credentials = admin_credentials.toJSON();
      const match = await bcrypt.compare(
        admin_data.password,
        admin_credentials.hashedPass
      );
      if (!match) {
        res.status(401).send({ message: "Invalid Password. Please try again" });
      } else {
        //console.log("awdawdawdawd" + req.session);
        const token = jwt.sign(
          { username: admin_credentials.username, isActive: true },
          config.jwtSecret,
          { expiresIn: "10h" }
        );
        let sessionData = req.session;
        sessionData.user = {}
        sessionData.user.name = admin_credentials.username
        sessionData.token = token;
        res.status(200).send({ token: token, message: "Login Successfull" });
      }
    }
  } catch (error) {
    res.status(500).send({ data: error, message: "Something went wrong" });
  }
};

const admin_dashboard = (req, res) => {
  res.render('admin_dashboard')
}

const admin_change_password = (req, res) => {
  res.render('admin_change_password')
}

const change_password_admin = async (req, res) => {
  try {
    var password_data = req.body
    if( !password_data.oldPassword || !password_data.password || !password_data.confirmPassword){
      res.status(500).send({ status: 500, message: 'Fill all password fields', data: 'Fill all passwords'})
    }
    else if( password_data.password !== password_data.confirmPassword){
      res.status(500).send({ status: 500, message: 'Please enter same newPassword and confirmNewPassword', data: 'new password and confirm new passwords aren\'t same'})
    }
    else{
      const Admin = db.Admin_Model
      let admin_data = await Admin.findOne()
      admin_data = admin_data.toJSON()
      const match = await bcrypt.compare(password_data.oldPassword, admin_data.password);
      if(!match){
        res.status(401).send({status: 401, message: "Incorrect old password"})
      }
      else{
        const result = await Admin.update({ password: password_data.password }, {where: { username: "admin" }, individualHooks: true})
        res.status(200).send({status: 200, data: result, message: "Password changed successfully"})
      }

    } 
  } catch (error) {
    res.status(500).send({ status: 500, message: "Something went wrong", data: error })
  }
};

const admin_logout = async (req, res) => {
  try {
    let sessionData = req.session;
    const logout = await sessionData.destroy();
    // console.log(logout);
    res.redirect('/admin/admin-login');
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e, message: 'Logout Failed. Please try again' });
  }
}

module.exports = { admin, admin_login, login_admin, admin_dashboard, admin_change_password, change_password_admin, admin_logout };

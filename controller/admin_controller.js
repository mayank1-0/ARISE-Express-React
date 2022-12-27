const db = require("../db/models/index");

const admin = async (req, res) => {
    try {
        const admin_credentials = {
            username: "admin",
            password: "admin"
        }
        const Admin = db.Admin_Model
        const result = await Admin.create(admin_credentials)
        res.status(200).send({ status: 200, data: result, message: 'Admin created successfully'});
    } catch (error) {
      res.status(500).send({ status: 500, data: error, message: "Something went wrong"})  
    }
}

const login_admin = (req, res) => {
    try {
      var admin_data = req.body;
      if (admin_data.password === "admin123" && admin_data.username === "admin123") {
        res.status(200).send({ status: 200, data: 'Login Successful', message: "Login Successful" });
    } else {
        res.status(500).send({ status: 500, data: 'Invalid Credentials', message: "Invalid Credentials" });
    }
    } catch (error) {
      res.status(500).send({ data: error, message: "Something went wrong" });
    }
  };

module.exports = {admin, login_admin}
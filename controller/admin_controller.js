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

const login_admin = async (req, res) => {
  try {
    var admin_data = req.body;
    console.log('1111', admin_data);
    const Admin = db.Admin_Model;
    let admin_credentials = await Admin.findOne({
      plain: true,
      where: { username: admin_data.username },
      attributes: ["id", "username", ["password", "hashedPass"]],
    });
    console.log('2222', admin_credentials);
    if (!admin_credentials) {
      res.status(401).send({ message: "User not found. Please try again" });
    } else {
      admin_credentials = admin_credentials.toJSON();
      console.log('3333', admin_credentials);
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
          { expiresIn: "1h" }
        );
        let sessionData = req.session;
        sessionData.token = token;
        res.status(200).send({ token: token, message: "Login Successfull" });
      }
    }
  } catch (error) {
    res.status(500).send({ data: error, message: "Something went wrong" });
  }
};

const change_password_admin = async (req, res) => {};

module.exports = { admin, login_admin, change_password_admin };

const jwt = require("jsonwebtoken");
const db = require("../db/models/index");
const config = require("../config.json");
const bcrypt = require("bcrypt");

const login_user = async (req, res) => {
  try {
    var user_data = req.body;
    if (user_data.login_type == "Student") {
      const Student_Registration = db.Student_Registration_Model;
      let user_credentials = await Student_Registration.findOne({
        plain: true,
        where: { email_id: user_data.email_id },
        attributes: [
          "enrollment_number",
          "email_id",
          ["password", "hashedPass"],
        ],
      });
      if (!user_credentials) {
        res.status(401).send({ message: "User not found. Please try again" });
      } else {
        user_credentials = user_credentials.toJSON();
        var match = await bcrypt.compare(
          user_data.password,
          user_credentials.hashedPass
        );
        if (!match) {
          res
            .status(401)
            .send({ message: "Invalid Password. Please try again" });
        } else {
          const token = jwt.sign(
            {
              enrollment_number: user_credentials.enrollment_number,
              isActive: true,
            },
            config.jwtSecret,
            { expiresIn: "1h" }
          );
          let sessionData = req.session;
          sessionData.user = {};
          sessionData.user.email_id = user_credentials.email_id;
          sessionData.token = token;
          res.status(200).send({ token: token, message: "Login Successfull" });
        }
      }
    } else if (user_data.login_type == "Faculty") {
      const Staff_Details = db.Staff_Details_Model;
      let user_credentials = await Staff_Details.findOne({
        plain: true,
        where: { email_id: user_data.email_id },
        attributes: [
          "employment_number",
          "email_id",
          ["password", "hashedPass"],
        ],
      });
      if (!user_credentials) {
        res.status(401).send({ message: "User not found. Please try again" });
      } else {
        user_credentials = user_credentials.toJSON();
        var match = await bcrypt.compare(
          user_data.password,
          user_credentials.hashedPass
        );
        if (!match) {
          res
            .status(401)
            .send({ message: "Invalid Password. Please try again" });
        } else {
          const token = jwt.sign(
            {
              employment_number: user_credentials.employment_number,
              isActive: true,
            },
            config.jwtSecret,
            { expiresIn: "1h" }
          );
          let sessionData = req.session;
          sessionData.user = {};
          sessionData.user.type = "Faculty";
          sessionData.user.email_id = user_credentials.email_id;
          sessionData.token = token;
          res.status(200).send({ token: token, message: "Login Successfull" });
        }
      }
    } else if (user_data.login_type == "Staff") {
      const Staff_Details = db.Staff_Details_Model;
      let user_credentials = await Staff_Details.findOne({
        plain: true,
        where: { email_id: user_data.email_id },
        attributes: [
          "employment_number",
          "email_id",
          ["password", "hashedPass"],
        ],
      });
      if (!user_credentials) {
        res.status(401).send({ message: "User not found. Please try again" });
      } else {
        user_credentials = user_credentials.toJSON();
        var match = await bcrypt.compare(
          user_data.password,
          user_credentials.hashedPass
        );
        if (!match) {
          res
            .status(401)
            .send({ message: "Invalid Password. Please try again" });
        } else {
          const token = jwt.sign(
            {
              employment_number: user_credentials.employment_number,
              isActive: true,
            },
            config.jwtSecret,
            { expiresIn: "1h" }
          );
          let sessionData = req.session;
          sessionData.user = {};
          sessionData.user.type = "Staff";
          sessionData.user.email_id = user_credentials.email_id;
          sessionData.token = token;
          res.status(200).send({ token: token, message: "Login Successfull" });
        }
      }
    } else if (user_data.login_type == "Centre Admin") {
      const Centres = db.Centres_Model;
      let user_credentials = await Centres.findOne({
        plain: true,
        where: { email_id: user_data.email_id },
        attributes: ["id", "email_id", ["password", "hashedPass"]],
      });
      if (!user_credentials) {
        res.status(401).send({ message: "User not found. Please try again" });
      } else {
        user_credentials = user_credentials.toJSON();
        var match = await bcrypt.compare(
          user_data.password,
          user_credentials.hashedPass
        );
        if (!match) {
          res
            .status(401)
            .send({ message: "Invalid Password. Please try again" });
        } else {
          const token = jwt.sign(
            {
              id: user_credentials.id,
              isActive: true,
            },
            config.jwtSecret,
            { expiresIn: "1h" }
          );
          let sessionData = req.session;
          sessionData.user = {};
          sessionData.user.email_id = user_credentials.email_id;
          sessionData.token = token;
          res.status(200).send({ token: token, message: "Login Successfull" });
        }
      }
    } else {
      const Admin = db.Admin_Model;
      let user_credentials = await Admin.findOne({
        plain: true,
        where: { email_id: user_data.email_id },
        attributes: ["id", "email_id", ["password", "hashedPass"]],
      });
      if (!user_credentials) {
        res.status(401).send({ message: "User not found. Please try again" });
      } else {
        user_credentials = user_credentials.toJSON();
        let match = await bcrypt.compare(
          user_data.password,
          user_credentials.hashedPass
        );
        if (!match) {
          res
            .status(401)
            .send({ message: "Invalid Password. Please try again" });
        } else {
          const token = jwt.sign(
            {
              id: user_credentials.id,
              isActive: true,
            },
            config.jwtSecret,
            { expiresIn: "1h" }
          );
          let sessionData = req.session;
          sessionData.user = {};
          sessionData.user.email_id = user_credentials.email_id;
          sessionData.token = token;
          res.status(200).send({ token: token, message: "Login Successfull" });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ data: error, message: "Something went wrong" });
  }
};

module.exports = {
  login_user,
};

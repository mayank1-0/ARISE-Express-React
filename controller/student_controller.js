const db = require("../db/models/index");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

const registration_form = (req, res) => {
  res.render("student_registration");
};

const register_student = async (req, res) => {
  try {
    const Student_Registration = db.Student_Registration_Model;
    var student_data = req.body;
    student_data.Password = student_data.enrollment_number;
    const result = await Student_Registration.create(student_data);
    res.send({
      status: 200,
      data: result,
      message: "Successfully registered student",
    });
  } catch (error) {
    res.status(500).send({ data: error, message: "Something went wrong" });
  }
};

const student_login = (req, res) => {
  res.render("student_login");
};

const login_student = async (req, res) => {
  try {
    const Student_Login = db.Student_Registration_Model;
    var student_data = req.body;
    const result = await Student_Login.findOne({
      where: { enrollment_number: student_data.enrollment_number },
    });
    if (student_data.password == result.Password) {
      const token = jwt.sign(
        {
          enrollment_number: result.enrollment_number,
          isActive: true,
        },
        config.jwtSecret,
        { expiresIn: "4h" }
      );
      let sessionData = req.session;
      sessionData.user = {};
      sessionData.user.name = result.Student_Name;
      sessionData.token = token;
      res
        .status(200)
        .send({ status: 200, token: token, message: "Login Successful" });
    } else {
      console.log("Invalid Credentials");
      res.status(401).send({ status: 401, message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).send({ data: error, message: "Something went wrong" });
  }
};

const fetch_student_personal_details = async (req, res) => {
  try {
    var sessionData = req.session;
    var token = sessionData.token;
    var decodedToken = jwt.verify(token, config.jwtSecret);
    const enrollment_number = decodedToken.enrollment_number;
    const Student_Details = db.Student_Registration_Model;
    const result = await Student_Details.findOne({
      where: { enrollment_number: enrollment_number },
    });
    const required_personal_details = {
      Full_Name: result.Student_Name,
      Father_Name: result.Father_Name,
      DOB: result.Date_of_birth,
      Sex: result.Sex,
      Primary_Contact: result.Contact_number,
      Address: result.Address,
      City: result.City,
      Center_Code: result.center_code,
      Enrollment_Number: result.enrollment_number,
      Registration_Number: result.registration_number,
      Marital_Status: result.Marital_status,
      Secondary_Contact: result.Parents_contact,
      Village_Sector: result.Sector_Village_Colony,
      Email_ID: result.Email_ID,
    };
    res.status(200).send({
      status: 200,
      data: required_personal_details,
      message: "Details fetched successfully",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, data: error, message: "Something went wrong" });
  }
};

const update_student_personal_details = async (req, res) => {
  try {
    const Student_Registration = db.Student_Registration_Model;
    var updated_details = req.body;
    console.log("222222", updated_details);
    const token = req.session.token;
    var decodedToken = jwt.verify(token, config.jwtSecret);
    const enrollment_number = decodedToken.enrollment_number;
    const result = await Student_Registration.update(
      {
        Father_Name: updated_details.Father_Name,
        Date_of_birth: updated_details.Date_of_birth,
        Marital_status: updated_details.Marital_Status,
        Sex: updated_details.Sex,
        Contact_number: updated_details.Contact_number,
        Parents_contact: updated_details.Parents_contact,
        Address: updated_details.Address,
        Sector_Village_Colony: updated_details.Sector_Village_Colony,
        City: updated_details.City,
        Email_ID: updated_details.Email_ID
      },
      {
        where: { enrollment_number: enrollment_number },
        // individualHooks: true,
      }
    );
    res.status(200).send({
      status: 200,
      data: result,
      message: "Information updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, data: error, message: "Something went wrong" });
  }
};

module.exports = {
  registration_form,
  register_student,
  student_login,
  login_student,
  fetch_student_personal_details,
  update_student_personal_details,
};

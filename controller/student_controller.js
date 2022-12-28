const db = require("../db/models/index");

const registration_form = (req, res) => {
  res.render("student_registration");
};

const register_student = async (req, res) => {
  try {
    const Student_Registration = db.Student_Registration_Model;
    var student_data = req.body;
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
      where: { enrolment_number: student_data.enrolment_number },
    });
    if (student_data.password == result.password) {
      console.log("Login successful");
    } else {
      console.log("Invalid Credentials");
    }
    res.send({ status: 200, data: result, message: "Login Successful" });
  } catch (error) {
    res.status(500).send({ data: error, message: "Invalid credentials" });
  }
};



module.exports = {
  registration_form,
  register_student,
  student_login,
  login_student
};

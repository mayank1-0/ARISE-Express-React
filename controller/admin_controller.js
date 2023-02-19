const jwt = require("jsonwebtoken");
const config = require("../config.json");
const bcrypt = require("bcrypt");
const moment = require("moment");
const randomstring = require("randomstring");


const db = require("../db/models/index");

const admin = async (req, res) => {
  try {
    const admin_credentials = {
      username: "admin",
      email_id: "admin@admin.com",
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
          { id: admin_credentials.id, isActive: true },
          config.jwtSecret,
          { expiresIn: "30m" }
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
      res.status(500).send({ status: 401, message: 'Fill all password fields', data: 'Fill all passwords'})
    }
    else if( password_data.password !== password_data.confirmPassword){
      res.status(500).send({ status: 401, message: 'Please enter same newPassword and confirmNewPassword', data: 'new password and confirm new passwords aren\'t same'})
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

const staff_window = (req, res) => {
  res.render('admin_staff_window')
}

const fetch_all_centre_details = async (req, res) => {
  try {
    const Centres = db.Centres_Model;
    const result = await Centres.findAll();
    res.status(200).send({
      status: 200,
      data: result,
      message: "Details fetched successfully",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, data: error, message: "Something went wrong" });
  }
}

const add_centre = async (req, res) => {
  try {
    var centre_data = req.body;
    const Centres = db.Centres_Model;
    console.log('3333', centre_data);
    const result = await Centres.create(centre_data);
    res
      .status(200)
      .send({ status: 200, data: result, message: "Centre added successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, data: error, message: "Something went wrong" });
  }
};

const update_centre = async (req, res) => {
  try {
    var data = req.body;
    const Centres = db.Centres_Model
    const result = await Centres.update({ centre_name: data.centre_name, centre_head_name: data.centre_head_name, centre_contact_number: data.centre_contact_number, centre_address: data.centre_address, centre_start_date: data.centre_start_date, centre_valid_upto: data.centre_valid_upto, centre_head_contact_number: data.centre_head_contact_number, sector_village: data.sector_village, email_id: data.email_id, username: data.username, password: data.password }, {where: { centre_code: data.centre_code }, individualHooks: true})
    res.status(200).send({status: 200, data: result, message: "Updated centres data successfully"})
  } catch (error) {
    res.status(500).send({status: 500, data: error, message: "Something went wrong"})
  }
}

const fetch_all_staff_details = async (req, res) => {
  try {
    const Staff_Details = db.Staff_Details_Model;
    const result = await Staff_Details.findAll();
    res.status(200).send({
      status: 200,
      data: result,
      message: "Details fetched successfully",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, data: error, message: "Something went wrong" });
  }
}

const add_staff_window = (req, res) => {
  res.render('admin_add_staff_window')
}

const add_staff = async (req, res) => {
  try {
    var staff_data = req.body;
    console.log('1111');
    const Staff_Details = db.Staff_Details_Model;
    console.log('2222');
    staff_data.employment_number = `${moment().unix()}-${randomstring.generate({
      //Generating random string. randomstring is a package used to generate a random string.To make it unique we have attached time stamp to it, moment().unix() is the current timestamp generated in milliseconds.
      length: 6,
      readable: true,
      capitalization: "uppercase",
      charset: "alphanumeric",
    })}`;
    console.log('3333', staff_data);
    const result = await Staff_Details.create(staff_data);
    res
      .status(200)
      .send({ status: 200, data: result, message: "Staff added successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, data: error, message: "Something went wrong" });
  }
};

const update_staff_window_1 = (req, res) => {
  res.render("admin_update_staff_window_1")
}

const update_staff_window_2 = (req, res) => {
  res.render("admin_update_staff_window_2")
}

const check_employment_number = async (req,res) => {
  try {
    const data = req.body;
    const employment_number = data.employment_number;
    console.log("..... ", employment_number);
    const Staff_Details = db.Staff_Details_Model;
    const result = await Staff_Details.findOne({
      where: { employment_number: employment_number },
    });
    if (result === null) {
      res.status(404).send({
        status: 404,
        message: "No such employee with the given employment_number exists",
      });
    } else {
      res.status(200).send({
        status: 200,
        data: result,
        message: "Successfully fetched employee details",
      });
    }
  } catch (error) {
    res.status(500).send({ data: error, message: "Something went wrong" });
  }
}

const update_staff_status = async (req, res) => {
  try {
    var data = req.body;
    const Staff_Details = db.Staff_Details_Model
    const result = await Staff_Details.update({ Promotion_date: data.Promotion_date, designation: data.designation, Date_of_job_leave: data.Date_of_job_leave, Reason: data.Reason, status: data.status }, {where: { employment_number: data.employment_number }, individualHooks: true})
    res.status(200).send({status: 200, data: result, message: "Updated staff status successfully"})
  } catch (error) {
    res.status(500).send({status: 500, data: error, message: "Something went wrong"})
  }
}

const fetchStaffDetails = async (req, res) => {
  try {
    var data = req.body
    var employmentNumber = data.employment_number
    const Staff_Details = db.Staff_Details_Model;
    const result = await Staff_Details.findOne({
      where: { employment_number: employmentNumber },
    });
    res.status(200).send({
      status: 200,
      data: result,
      message: "Details fetched successfully",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, data: error, message: "Something went wrong" });
  }
};

// enquiry related routes

const fetch_all_enquiry_details = async (req, res) => {
  try {
    const Enquiry = db.Enquiry_Model;
    const result = await Enquiry.findAll();
    var result_data = { Date_and_time: result.Date_and_time, Enquiry_name: result.Enquiry_name, Course: result.Course, Address: result.Address, Contact_number_1: result.Contact_number_1, status: result.isActive }
    res.status(200).send({
      status: 200,
      data: result_data,
      message: "Details fetched successfully",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, data: error, message: "Something went wrong" });
  }
};

const add_enquiry = async (req, res) => {
  try {
    var enquiry_data = req.body;
    console.log('1111');
    const Enquiry = db.Enquiry_Model;
    console.log('2222');
    console.log('3333', enquiry_data);
    const result = await Enquiry.create(enquiry_data);
    res
      .status(200)
      .send({ status: 200, data: result, message: "Enquiry created successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, data: error, message: "Something went wrong" });
  }
};

const enquiry_follow_up = async (req, res) => {
  try {
    var enquiry_follow_up_data = req.body;
    console.log('1111');
    const Enquiry = db.Enquiry_Model;
    console.log('2222');
    console.log('3333', enquiry_follow_up_data);
    const result = await Enquiry.update({ Follow_up_date: enquiry_follow_up_data.Follow_up_date, Counsellor_name: enquiry_follow_up_data.Counsellor_name, Counsellor_remarks: enquiry_follow_up_data.Counsellor_remarks, isActive: enquiry_follow_up_data.Enquiry_status}, {where: { id: enquiry_follow_up_data.Enquiry_Number }, individualHooks: true});
    res
      .status(200)
      .send({ status: 200, data: result, message: "Enquiry/Follow-up updated successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, data: error, message: "Something went wrong" });
  }
};

// Courses related functions

const fetch_all_courses_details = async (req, res) => {
  try {
    const Course_Details = db.Course_Details_Model;
    const result = await Course_Details.findAll();
    var result_data = { course_code: result.course_code, course_name: result.course, Duration: result.duration, Registration_fee: result.registration_fee, Monthly_fee: result.monthly_fee}
    res.status(200).send({
      status: 200,
      data: result_data,
      message: "Courses details fetched successfully",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, data: error, message: "Something went wrong" });
  }
};

const add_course = async (req, res) => {
  try {
    var course_data = req.body;
    console.log('1111');
    const Course_Details = db.Course_Details_Model;
    console.log('2222');
    console.log('3333', course_data);
    const result = await Course_Details.create(course_data);
    res
      .status(200)
      .send({ status: 200, data: result, message: "Course created successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, data: error, message: "Something went wrong" });
  }
};

const update_course = async (req, res) => {
  try {
    var data = req.body;
    const Course_Details = db.Course_Details_Model
    const result = await Course_Details.update({ course: data.course, duration: data.duration, registration_fee: data.registration_fee, monthly_fee: data.monthly_fee }, {where: { course_code: data.course_code }, individualHooks: true})
    res.status(200).send({status: 200, data: result, message: "Updated course data successfully"})
  } catch (error) {
    res.status(500).send({status: 500, data: error, message: "Something went wrong"})
  }
}

// Student related functions

const fetch_all_student_details = async (req, res) => {
  try {
    const Student_Registration = db.Student_Registration_Model;
    const result = await Student_Registration.findAll();
    var result_data = { enrollment_number: result.enrollment_number, center_code: result.center_code, registration_number: result.registration_number, Student_Name: result.Student_Name, course: result.course, Date_of_joining: result.Date_of_joining }
    res.status(200).send({
      status: 200,
      data: result_data,
      message: "Student details fetched successfully",
    });
  } catch (error) {
    res.status(500).send({status: 500, data: error, message: "Something went wrong"})
  }
}

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

const update_student_personal_details = async (req, res) => {
  try {
    const Student_Registration = db.Student_Registration_Model;
    var updated_details = req.body;
    console.log("222222", updated_details);
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
        where: { enrollment_number: updated_details.enrollment_number },
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



module.exports = { admin, admin_login, login_admin, admin_dashboard, admin_change_password, change_password_admin, admin_logout, staff_window, fetch_all_centre_details, add_centre, update_centre, fetch_all_staff_details, add_staff_window, add_staff, update_staff_window_1, update_staff_window_2, update_staff_status, check_employment_number, fetchStaffDetails, fetch_all_enquiry_details, add_enquiry, enquiry_follow_up, fetch_all_courses_details, add_course, update_course, fetch_all_student_details, register_student, update_student_personal_details };

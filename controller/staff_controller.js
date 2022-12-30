const jwt = require("jsonwebtoken");
const randomstring = require('randomstring');
const moment = require('moment');
const db = require("../db/models/index");
const config = require("../config.json");
const fs = require("fs");
const csv = require("fast-csv");
const bcrypt = require('bcrypt')

const add_staff = async (req, res) => {
  try {
    const staff_data = req.body;
    const Staff_Details = db.Staff_Details_Model;
    staff_data.employment_number = `${moment().unix()}-${randomstring.generate({
      //Generating random string. randomstring is a package used to generate a random string.To make it unique we have attached time stamp to it, moment().unix() is the current timestamp generated in milliseconds.
      length: 6,
      readable: true,
      capitalization: "uppercase",
      charset: "alphanumeric",
    })}`;
    const result = await Staff_Details.create(staff_data);
    res
      .status(200)
      .send({ status: 200, data: result, message: "Staff added successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, data: result, message: "Something went wrong" });
  }
};

const staff_login = (req, res) => {
  res.render("staff_login");
};

const login_staff = async (req, res) => {
  try {
    var staff_data = req.body;
    console.log('1111', staff_data);
    const Staff_Details = db.Staff_Details_Model
    let staff_credentials = await Staff_Details.findOne({
      plain: true,
      where: { center: staff_data.center, username: staff_data.username },
      attributes: ["employment_number", "username", ["password", "hashedPass"]],
    });
    console.log('2222', staff_credentials);
    if (!staff_credentials) {
      res.status(401).send({ message: "User not found. Please try again" });
    } else {
      staff_credentials = staff_credentials.toJSON();
      console.log('3333', staff_credentials);
      const match = await bcrypt.compare(
        staff_data.password,
        staff_credentials.hashedPass
      );
      if (!match) {
        res.status(401).send({ message: "Invalid Password. Please try again" });
      } else {
        //console.log("awdawdawdawd" + req.session);
        const token = jwt.sign(
          { employment_number: staff_credentials.employment_number, isActive: true },
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

const staff_dashboard = (req, res) => {
  res.render("staff_dashboard");
};

const fetchStaffDetails = async (req, res) => {
  try {
    var sessionData = req.session
    var token = sessionData.token
    console.log("1111", token);
    var decodedToken = jwt.verify(token, config.jwtSecret);
    console.log("2222", decodedToken);
    const employmentNumber = decodedToken.employment_number;
    console.log("3333", employmentNumber);
    const Staff_Details = db.Staff_Details_Model;
    const result = await Staff_Details.findOne({
      where: { employment_number: employmentNumber },
    });
    res
      .status(200)
      .send({
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

const admissions = (req, res) => {
  res.render("admissions");
};

const question_answer_login = (req, res) => {
  res.render("question_answer_login");
};

const login_question_answer = (req, res) => {
  const faculty_login = req.body;
  if (
    faculty_login.faculty_id == "arise123" &&
    faculty_login.password == "arise123"
  ) {
    userID = randomstring.generate();
    const token = jwt.sign(
      { userId: userID, isActive: true },
      config.jwtSecret,
      { expiresIn: "1h" }
    ); //if matches then creates a jwt token.
    let sessionData = req.session; // from where does req.session takes data ????????????????????
    sessionData.user = { name: "admin" };
    sessionData.token = token;
    res.status(200).send({
      status: 200,
      token: token,
      data: "Login successful",
      message: "Login Successful",
    });
  } else {
    res.status(500).send({
      status: 500,
      data: "Invalid credentials",
      message: "Invalid Credentials",
    });
  }
};

const question_answer_form = async (req, res) => {
  try {
    console.log("111111Session Data mmmmmmmmmm", req.session);
    const sessionData = req.session;
    if (sessionData.user.name === "admin") {
      res.render("question_answer_form_1");
    } else {
      console.log("1212");
      res.render("/question-answer-login");
    }
  } catch (e) {
    console.log("3333344455");
    res.render("/question-answer-login");
  }
};

const question_answer_form_2 = (req, res) => {
  try {
    console.log("22222 Data mmmmmmmmmm", req.session);
    const sessionData = req.session;
    if (sessionData.user.name === "admin") {
      res.render("question_answer_form_2");
    } else {
      console.log("1212");
      res.render("/question-answer-login");
    }
  } catch (e) {
    console.log("3333344455");
    res.render("/question-answer-login");
  }
};

const question_answers_choose = (req, res) => {
  res.render("question_answer_choose");
};

const add_question_answer = async (req, res) => {
  try {
    const Question_Answer = db.Question_Answer_Model;
    var question_answer_data = req.body;
    const result = await Question_Answer.create(question_answer_data);
    res.send({
      status: 200,
      data: result,
      message: "Successfully added question and answer",
    });
  } catch (error) {
    res.status(500).send({ data: error, message: "Something went wrong" });
  }
};

const uploadCsvFile = async (req, res) => {
  try {
    const Question_Answer = db.Question_Answer_Model;
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }
    let question_answer_data = [];
    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;
    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        //throw error.message;
      })
      .on("data", (row) => {
        question_answer_data.push(row);
      })
      .on("end", () => {
        Question_Answer.bulkCreate(question_answer_data)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const edit_question_answer_form_1 = (req, res) => {
  res.render("edit_question_answer_1");
};

const edit_question_answer_form_2 = (req, res) => {
  res.render("edit_question_answer_2");
};

const edit_question_answer = async (req, res) => {
  try {
    var updateData = req.body;
    var question_id = updateData.question_id;
    const fieldUpdate = updateData.fieldUpdate;
    var valueUpdate = updateData.valueUpdate;
    const Question_Answer = db.Question_Answer_Model;

    switch (fieldUpdate) {
      case "course_name":
        var result = await Question_Answer.update(
          {
            course_name: valueUpdate,
          },
          {
            where: {
              id: question_id,
            },
          }
        );
        break;

      case "course_code":
        var result = await Question_Answer.update(
          {
            course_code: valueUpdate,
          },
          {
            where: {
              id: question_id,
            },
          }
        );
        break;

      case "module":
        var result = await Question_Answer.update(
          {
            module: valueUpdate,
          },
          {
            where: {
              id: question_id,
            },
          }
        );
        break;

      case "topic":
        var result = await Question_Answer.update(
          {
            topic: valueUpdate,
          },
          {
            where: {
              id: question_id,
            },
          }
        );
        break;

      case "question":
        var result = await Question_Answer.update(
          {
            question: valueUpdate,
          },
          {
            where: {
              id: question_id,
            },
          }
        );
        break;

      case "option1":
        var result = await Question_Answer.update(
          {
            option1: valueUpdate,
          },
          {
            where: {
              id: question_id,
            },
          }
        );
        break;

      case "option2":
        var result = await Question_Answer.update(
          {
            option2: valueUpdate,
          },
          {
            where: {
              id: question_id,
            },
          }
        );
        break;

      case "option3":
        var result = await Question_Answer.update(
          {
            option3: valueUpdate,
          },
          {
            where: {
              id: question_id,
            },
          }
        );
        break;

      case "option4":
        var result = await Question_Answer.update(
          {
            option4: valueUpdate,
          },
          {
            where: {
              id: question_id,
            },
          }
        );
        break;

      case "answer":
        var result = await Question_Answer.update(
          {
            answer: valueUpdate,
          },
          {
            where: {
              id: question_id,
            },
          }
        );
        break;
    }

    res.send({
      status: 200,
      data: result,
      message: "Successfully updated question and answer",
    });
  } catch (error) {
    res.status(500).send({ data: error, message: "Something went wrong" });
  }
};

const check_question_id = async (req, res) => {
  try {
    console.log("qqqqq");
    const data = req.body;
    const question_id = data.question_id;
    console.log("wwwwww ", question_id);
    const Question_Answer = db.Question_Answer_Model;
    const result = await Question_Answer.findOne({
      where: { id: question_id },
    });
    if (result === null) {
      res.status(404).send({
        status: 404,
        message: "No such question with the given question_id exists",
      });
    } else {
      res.status(200).send({
        status: 200,
        data: result,
        message: "Successfully fetched question details",
      });
    }
  } catch (error) {
    res.status(500).send({ data: error, message: "Something went wrong" });
  }
};

const delete_question_answer = async (req, res) => {
  try {
    const Question_Answer = db.Question_Answer_Model;
    var question_id = req.params.questionId;
    const result = await Question_Answer.destroy({
      where: {
        id: question_id,
      },
    });
    res.send({
      status: 200,
      data: result,
      message: "Successfully deleted question and answer",
    });
  } catch (error) {
    res.status(500).send({ data: error, message: "Something went wrong" });
  }
};

const question_answers = (req, res) => {
  res.render("question_answer");
};

const view_question_answers = async (req, res) => {
  try {
    const Question_Answer = db.Question_Answer_Model;
    const result = await Question_Answer.findAll({
      attributes: [
        ["id", "questionId"],
        "course_name",
        "course_code",
        "module",
        "topic",
        "question",
        "option1",
        "option2",
        "option3",
        "option4",
        "answer",
      ],
    });
    res.send({
      status: 200,
      data: result,
      message: "Successfully retrieved questions and answers",
    });
  } catch (error) {
    res.status(500).send({ data: error, message: "Something went wrong" });
  }
};

module.exports = {
  add_staff,
  staff_login,
  login_staff,
  staff_dashboard,
  fetchStaffDetails,
  admissions,
  question_answer_login,
  login_question_answer,
  question_answers_choose,
  question_answer_form,
  question_answer_form_2,
  add_question_answer,
  uploadCsvFile,
  edit_question_answer_form_1,
  edit_question_answer_form_2,
  edit_question_answer,
  check_question_id,
  delete_question_answer,
  question_answers,
  view_question_answers,
};

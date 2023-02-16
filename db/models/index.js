const { Sequelize, DataTypes } = require("sequelize");
const {
  host,
  username,
  password,
  database,
  dialect,
} = require("../../config/db.config");
const Student_Registration_Model = require("./Student_Registration.model");
const Question_Answer_Model = require("./Question_Answer.model");
const Staff_Details_Model = require("./Staff_Details.model");
const Course_Details_Model = require("./Course_Details.model");
const Centres_Model = require("./Centres.model");
const Admin_Model = require("./Admin.model");
const Exam_Model = require("./Exam.model");
const Enquiry_Model = require("./Enquiry.model");

// connecting with mysql database
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
});
// try {
//   const sequelize = new Sequelize(database, username, password, {
//     host: host,
//     dialect: dialect,
//   });

//   await sequelize.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Student_Registration = Student_Registration_Model(Sequelize, sequelize);
const Exam = Exam_Model(Sequelize, sequelize);

Student_Registration.hasMany(Exam, {
  foreignKey: "registration_number",
});
Exam.belongsTo(Student_Registration, {
  foreignKey: "registration_number",
});

db.Student_Registration_Model = Student_Registration;
db.Question_Answer_Model = Question_Answer_Model(Sequelize, sequelize);
db.Staff_Details_Model = Staff_Details_Model(Sequelize, sequelize);
db.Course_Details_Model = Course_Details_Model(Sequelize, sequelize);
db.Centres_Model = Centres_Model(Sequelize, sequelize);
db.Admin_Model = Admin_Model(Sequelize, sequelize);
db.Exam_Model = Exam;
db.Enquiry_Model = Enquiry_Model(Sequelize, sequelize)

module.exports = db;

const { Sequelize, DataTypes } = require('sequelize');
const { host, username, password, database, dialect} = require('../../config/db.config')
const Student_Registration_Model = require('./Student_Registration.model')
const Question_Answer_Model = require('./Question_Answer.model')
const Staff_Details_Model = require('./Staff_Details.model')
const Course_Details_Model = require('./Course_Details.model')
const Centres_Model = require('./Centres.model')
const Admin_Model = require('./Admin.model')

// connecting with mysql database

const sequelize = new Sequelize(username, password, database, {
    host: host,
    dialect: dialect
});

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Student_Registration_Model = Student_Registration_Model(Sequelize, sequelize);
db.Question_Answer_Model = Question_Answer_Model(Sequelize, sequelize);
db.Staff_Details_Model = Staff_Details_Model(Sequelize, sequelize);
db.Course_Details_Model = Course_Details_Model(Sequelize, sequelize);
db.Centres_Model = Centres_Model(Sequelize, sequelize);
db.Admin_Model = Admin_Model(Sequelize, sequelize);

module.exports = db

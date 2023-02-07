const Course_Details_Model = (Sequelize, sequelize) => {
    const Course_Details = sequelize.define("Course_Details", {
      // Model attributes are defined here
      course_code: {
        type: Sequelize.STRING,
        // allowNull defaults to true
      },
      course: {
        type: Sequelize.STRING,
        allowNull: false
      },
      module: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //   notEmpty: true
        // }
      },
      sub_module: {
        type: Sequelize.STRING,
        allowNull: false
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      registration_fee: {
        type: Sequelize.INTEGER,
      },
      monthly_fee: {
        type: Sequelize.INTEGER,
      }
    });
    return Course_Details
  };
  
  module.exports = Course_Details_Model;
  
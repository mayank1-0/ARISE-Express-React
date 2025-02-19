const Exam_Model = (Sequelize, sequelize) => {
    const Exam = sequelize.define("Exam", {
      // Model attributes are defined here
      registration_number: {
        type: Sequelize.STRING,
      // allowNull defaults to true
      },
      Student_Name: {
        type: Sequelize.STRING,
      },
      course: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //   notEmpty: true
        // }
      },
      module: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //   notEmpty: true
        // }
      },
      Batch: {
        type: Sequelize.STRING,
      },
      Date: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      Exam: {
        type: Sequelize.STRING,
      },
      Marks: {
        type: Sequelize.INTEGER
      },
      Results: {
        type: Sequelize.STRING
      },
      Attempt: {
        type: Sequelize.INTEGER
      }
    });
    return Exam
  };
  
  module.exports = Exam_Model;
  
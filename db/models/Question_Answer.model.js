const Question_Answer_Model = (Sequelize, sequelize) => {
    const Question_Answer = sequelize.define("Question_Answer", {
      // Model attributes are defined here
      course_name: {
        type: Sequelize.STRING,
      },
      course_code: {
        type: Sequelize.STRING,
        // allowNull defaults to true
      },
      module: {
        type: Sequelize.STRING,
      },
      topic: {
        type: Sequelize.STRING,
      },
      question: {
        type: Sequelize.STRING,
      },
      option1: {
        type: Sequelize.STRING,
      },
      option2: {
        type: Sequelize.STRING,
      },
      option3: {
        type: Sequelize.STRING,
      },
      option4: {
        type: Sequelize.STRING,
      },
      answer: {
        type: Sequelize.STRING,
      }
    });
    return Question_Answer
  };
  
  module.exports = Question_Answer_Model;
  
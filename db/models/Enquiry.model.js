const Enquiry_Model = (Sequelize, sequelize) => {
    const Enquiry = sequelize.define("Enquiry", {
      // Model attributes are defined here
      Date_and_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      Enquiry_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Course: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Contact_number_1: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      Contact_number_2: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true,
        validate: {
            notEmpty: true
        }
      },
      Follow_up_date: {
        type: Sequelize.DATEONLY
      },
      Counsellor_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Counsellor_remarks: {
        type: Sequelize.STRING
      }
    });
    return Enquiry
  };
  
  module.exports = Enquiry_Model;
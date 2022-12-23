const Staff_Details_Model = (Sequelize, sequelize) => {
    const Staff_Details = sequelize.define("Staff_Details", {
      // Model attributes are defined here
      employment_number: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
        // allowNull defaults to true
      },
      designation: {
        type: Sequelize.STRING,
      },
      Employee_Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Father_Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Date_of_joining: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isDate: true
        }
      },
      Date_of_Birth: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isDate: true
        }
      },
      Marital_status: {
        type: Sequelize.STRING,
      },
      Sex: {
        type: Sequelize.STRING,
      },
      Current_Address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      Sector_Village_Colony: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      Contact_number: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        validate: { 
            isEmail: true 
        }
      },
      Educational_qualification: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      Professional_qualification: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
        Photograph: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      Adhar_card_number_scan_copy: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
      Username: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
    return Staff_Details
  };
  
  module.exports = Staff_Details_Model;
  
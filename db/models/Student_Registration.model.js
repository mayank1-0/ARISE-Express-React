const Student_Registration_Model = (Sequelize, sequelize) => {
  const Student_Registration = sequelize.define("Student_Registration", {
    // Model attributes are defined here
    enrolment_number: {
      type: Sequelize.STRING,
    },
    centre_code: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    registration_number: {
      type: Sequelize.STRING,
    },
    Student_Name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    Father_Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Mother_Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Date_of_birth: {
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
    Category: {
      type: Sequelize.STRING,
    },
    Address: {
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
    City: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    State: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    Pin_code: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Contact_number: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    Parents_contact: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    Highest_educational_qualification: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    Course_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    Duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Course_code: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    Date_of_joining: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    Batch_time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Registration_fee: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Monthly_fee: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Discount: {
      type: Sequelize.INTEGER,
    },
    Percent_discount: {
      type: Sequelize.INTEGER,
    },
    Monthly_installment: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Note: {
      type: Sequelize.STRING,
    },
    School_name_address: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    Admission_Type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Photograph: {
      type: Sequelize.BLOB,
      allowNull: true,
    },
    Signature: {
      type: Sequelize.BLOB,
      allowNull: true,
    },
    Password: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  });
  return Student_Registration
};

module.exports = Student_Registration_Model;

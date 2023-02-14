const Student_Registration_Model = (Sequelize, sequelize) => {
  const Student_Registration = sequelize.define("Student_Registration", {
    // Model attributes are defined here
    enrollment_number: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    center_code: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    registration_number: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    Student_Name: {
      type: Sequelize.STRING,
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
    email_id: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    Highest_educational_qualification: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    course: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    course_code: {
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

const Centres_Model = (Sequelize, sequelize) => {
    const Centres = sequelize.define("Centres", {
      // Model attributes are defined here
      centre_code: {
        type: Sequelize.STRING,
        // allowNull defaults to true
      },
      centre_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
      },
      centre_head_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
      },
      centre_contact_number: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: 10
        }
      },
      centre_address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      centre_start_date: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isDate: true,
          notEmpty: true
        }
      },
      centre_valid_upto: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isDate: true,
          notEmpty: true
        }
      },
      centre_head_contact_number: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: 10
          }
      },
      sector_village: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email_id: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true,
        validate: {
            notEmpty: true
        }
      }
    });
    return Centres
  };
  
  module.exports = Centres_Model;
  
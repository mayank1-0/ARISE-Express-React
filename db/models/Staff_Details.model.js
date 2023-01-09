const bcrypt = require("bcrypt");

const Staff_Details_Model = (Sequelize, sequelize) => {
  const Staff_Details = sequelize.define(
    "Staff_Details",
    {
      // Model attributes are defined here
      employment_number: {
        type: Sequelize.STRING,
      },
      center: {
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
        allowNull: false,
      },
      Father_Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Date_of_joining: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      Date_of_Birth: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isDate: true,
        },
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
          notEmpty: true,
        },
      },
      Sector_Village_Colony: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      Contact_number: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      Educational_qualification: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      Professional_qualification: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      Photograph: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      Adhar_card_number_scan_copy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },

    {
      hooks: {
        //any operation we do before a function
        beforeCreate(user, options) {
          //function called before creating a table.
          // console.log(user.toJSON().password);
          if (user.toJSON().password) {
            return bcrypt
              .hash(user.toJSON().password, 10) //converts password into hash or salt.
              .then((hash) => {
                // console.log(hash);
                // user.toJSON().password = hash;
                user.set("password", hash);
              })
              .catch((err) => {
                console.log(err);
                throw new Error();
              });
          }
        },
        beforeUpdate(user, options) {
          //function called before updating a table.
          console.log('9999999999999999', user.toJSON().password);
          if (user.toJSON().password) {
            return bcrypt
              .hash(user.toJSON().password, 10)
              .then((hash) => {
                // console.log(hash);
                // user.toJSON().password = hash;
                user.set("password", hash);
              })
              .catch((err) => {
                console.log(err);
                throw new Error();
              });
          }
        },
      },
    }
  );

  return Staff_Details;
};

module.exports = Staff_Details_Model;

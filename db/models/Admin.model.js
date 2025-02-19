const bcrypt = require("bcrypt");

const Admin_Model = (Sequelize, sequelize) => {
  const Admin = sequelize.define("Admin",
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email_id: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },

    {
      hooks: {
        //any operation we do before a function
        beforeCreate(user, options) {
          //function called before creating a table.
          console.log('0000',user.toJSON().password);
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
          console.log('----', user.toJSON().password);
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

  return Admin;
};

module.exports = Admin_Model
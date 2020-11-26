"use strict";
// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  // The email cannot be null, and must be a proper email before creation
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      // The password cannot be null
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Hooks are automatic methods that run during various phases of the User Model lifecycle
      // In this case, before a User is created, we will automatically hash their password
      hooks: {
        beforeCreate(user) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        },
      },
      sequelize,
      modelName: "User",
    }
  );

  return User;
};

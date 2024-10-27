// models/UserProfile.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path to your database config

const UserProfile = sequelize.define('UserProfile', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // name of the User table
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING, // Store the image URL
    allowNull: true,
  },
  skills: {
    type: DataTypes.TEXT, // For a comma-separated list or JSON string
    allowNull: true,
  },
  services: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  experience: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Flag for paid profiles
  },
});

module.exports = UserProfile;

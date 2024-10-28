const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path to your database config
const User = require('./user'); // Import the User model to set up the association

// Define the UserProfile model
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

// Define the association with onDelete: 'CASCADE'
UserProfile.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE', // Enable cascading delete
});

module.exports = UserProfile;

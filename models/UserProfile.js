const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path to your database config
const User = require('./user'); // Import the User model to set up the association

// Define the UserProfile model
const UserProfile = sequelize.define('UserProfile', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Reference the User model directly instead of the table name
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
}, {
  tableName: 'user_profiles', // Optional: specify the table name
});

// Define the association with User, ensuring proper referencing
UserProfile.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE', // Enable cascading delete
});

// Export the UserProfile model
module.exports = UserProfile;

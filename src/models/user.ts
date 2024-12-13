import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/database'; // Import the sequelize instance

// Define the User model using named export
export const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false, // Ensure the ID is not null
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // Password cannot be null
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false, // Username cannot be null
  },
  tier: {
    type: DataTypes.STRING,
    allowNull: false, // Tier (free/paid) cannot be null
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user', // Default role is 'user'
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Default value for is_verified
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true, // resetToken can be null initially
  },
  resetTokenExpiration: {
    type: DataTypes.DATE,
    allowNull: true, // resetTokenExpiration can be null initially
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false, // createdAt cannot be null
    defaultValue: DataTypes.NOW, // Set default to current timestamp
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true, // Allow NULL for updatedAt
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Set default to current timestamp
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  tableName: 'Users', // Table name in the database
  underscored: true, // Use snake_case column names in the database
});


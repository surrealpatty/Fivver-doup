import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Adjust import path as necessary

class User extends Model {
  // User model properties here (id, email, username, etc.)
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // Enable automatic management of createdAt and updatedAt
    createdAt: true,  // Let Sequelize handle createdAt field automatically
    updatedAt: true,  // Let Sequelize handle updatedAt field automatically
  }
);

export default User;
